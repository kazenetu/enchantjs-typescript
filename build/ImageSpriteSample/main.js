var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        _super.apply(this, arguments);
        this.group = null;
        this.sprite = null;
    }
    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    GameMain.prototype.onInitialize = function () {
        this.screenHeight = 640;
        this.fps = 30;
    };
    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    GameMain.prototype.onResourceSetting = function () {
        this.resourceManager.SetResourcePath("../../assets/resources/");
        this.resourceManager.AddResourceName("charaImage", "chara.png");
    };
    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    GameMain.prototype.onLoad = function (parent) {
        //グループインスタンス作成
        this.group = new Rf.ETS.FrameWork.Group(parent);
        this.group.y = 100;
        //画像無しスプライトインスタンス作成
        var surface = new Rf.ETS.FrameWork.NoImageSprite(100, 100, this.group);
        surface.SetSurface("rgb(128,255,255)");
        surface.opacity = 0.5;
        //スプライトインスタンス作成
        this.sprite = new Rf.ETS.FrameWork.Sprite(32, 32, this.group);
        this.sprite.FileName = this.resourceManager.GetResourceName("charaImage");
        this.sprite.originX = 16; //中心で回転するように設定
        this.sprite.originY = 16; //中心で回転するように設定
        this.sprite.frame = 26 * 2; //サンプル画像で正面画像を表示する
    };
    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    GameMain.prototype.onRun = function () {
        //グループを右に移動する
        this.group.x += 2;
        if (this.group.x >= 200) {
            this.group.x = 0;
        }
        //グループ内メンバのスプライトを回転させる
        this.sprite.rotation += 5;
        if (this.sprite.rotation >= 360) {
            this.sprite.rotation = 0;
        }
    };
    return GameMain;
}(Rf.ETS.FrameWork.GameMain));
//メインクラスのインスタンス作成
createMain(GameMain);
