var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * メインクラス
*/
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        _super.apply(this, arguments);
        this.group = null;
        this.mapHeight = 0;
        this.mapWidth = 0;
        this.mapCol = null;
        this.touchPanel = null;
        this.touchX = -1;
        this.touchY = -1;
    }
    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    GameMain.prototype.onInitialize = function () {
        //サイズを320x480に変更
        this.screenWidth = 320;
        this.screenHeight = 480;
    };
    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    GameMain.prototype.onResourceSetting = function () {
        this.resourceManager.SetResourcePath("./assets/");
        this.resourceManager.AddResourceName("mapImage", "resources/map1.gif");
        this.resourceManager.AddResourceName("charaImage", "resources/chara.png");
        this.resourceManager.AddResourceName("cursorImage", "resources/cursor.png");
        this.resourceManager.AddResourceName("exitImage", "resources/menu_exit.png");
        this.resourceManager.AddResourceName("mapData", "data/mapdata.json");
    };
    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    GameMain.prototype.onLoad = function (parent) {
        var _this = this;
        //グループインスタンス作成
        this.group = new Rf.ETS.FrameWork.Group(parent);
        this.group.y = 50;
        //背景用マップの読み込み
        var map = new Rf.ETS.FrameWork.Map(16, 16, this.group);
        map.FileName = this.resourceManager.GetResourceName("mapImage");
        var mapdata = JSON.parse(enchant.Core.instance.assets[this.resourceManager.GetResourceName("mapData")]);
        map.loadData(mapdata.map0, mapdata.map1);
        //マップ情報の設定
        this.mapHeight = mapdata.map0.length;
        this.mapWidth = mapdata.map0[0].length;
        this.mapCol = mapdata.mapCol;
        //TODO キャラクタの設定
        //前景用マップの読み込み
        // var foregroundMap = new Rf.ETS.FrameWork.Map(16, 16, this.group);
        // foregroundMap.FileName = this.resourceManager.GetResourceName("mapImage");
        // foregroundMap.LoadData(mapdata.foreMap);
        //タッチ用スプライトの追加
        this.touchPanel = new Rf.ETS.FrameWork.Sprite(this.mapWidth * 16, this.mapHeight * 16, this.group);
        this.touchPanel.touchEnabled = true;
        this.touchPanel.addEventListener(enchant.Event.TOUCH_MOVE, function (e) {
            _this.touchX = Math.floor((e.localX) / 16) * 16 + 4;
            _this.touchY = Math.floor((e.localY) / 16) * 16 + 0;
        });
    };
    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    GameMain.prototype.onRun = function () {
        //表示位置の設定:マップの移動
        this.group.x = -this.touchX + this.screenWidth / 2;
        if (this.group.x > 0) {
            this.group.x = 0;
        }
        if (this.group.x < -16 * this.mapWidth + this.screenWidth) {
            this.group.x = -16 * this.mapWidth + this.screenWidth;
        }
        this.group.y = -this.touchY + this.screenHeight / 2;
        if (this.group.y > 0) {
            this.group.y = 0;
        }
        if (this.group.y <= -16 * this.mapHeight + this.screenHeight) {
            this.group.y = -16 * this.mapHeight + this.screenHeight;
        }
    };
    return GameMain;
}(Rf.ETS.FrameWork.GameMain));
//メインクラスのインスタンス作成
createMain(GameMain);
