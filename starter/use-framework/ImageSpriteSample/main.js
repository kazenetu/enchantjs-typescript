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
        this.touchCharactor = null;
        this.touchCharactorTouchPosX = 0;
        this.touchCharactorTouchPosY = 0;
    }
    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    GameMain.prototype.onInitialize = function () {
        //サイズを640x640に変更
        this.screenHeight = 640;
        //fpsを10から30に変更
        this.fps = 30;
    };
    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    GameMain.prototype.onResourceSetting = function () {
        this.resourceManager.SetResourcePath("./assets/resources/");
        this.resourceManager.AddResourceName("charaImage", "chara.png");
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
        //タッチイベント用キャラクタ
        this.touchCharactor = new Rf.ETS.FrameWork.Character(32, 32, parent);
        this.touchCharactor.FileName = this.resourceManager.GetResourceName("charaImage");
        this.touchCharactor.charaIndex = 3;
        this.touchCharactor.Dir = Rf.ETS.FrameWork.Direction.Up;
        this.touchCharactor.x = 32;
        this.touchCharactor.y = 32;
        this.touchCharactor.originX = 16 * 2;
        this.touchCharactor.originY = 16 * 2;
        this.touchCharactor.scale(2.0, 2.0);
        this.touchCharactor.maxWaitCount = 3;
        this.touchCharactor.addEventListener(enchant.Event.TOUCH_START, function (e) {
            //タッチ開始時は前を向いて、アニメーションを停止させる
            _this.touchCharactor.Dir = Rf.ETS.FrameWork.Direction.Down;
            _this.touchCharactor.SuspendAnime();
            _this.touchCharactorTouchPosX = _this.touchCharactor.x - e.x;
            _this.touchCharactorTouchPosY = _this.touchCharactor.y - e.y;
        });
        this.touchCharactor.addEventListener(enchant.Event.TOUCH_MOVE, function (e) {
            //タッチ中はその位置にキャラクタを移動させる
            _this.touchCharactor.x = e.x + _this.touchCharactorTouchPosX;
            _this.touchCharactor.y = e.y + _this.touchCharactorTouchPosY;
        });
        this.touchCharactor.addEventListener(enchant.Event.TOUCH_END, function (e) {
            //タッチ終了時は後ろを向いて、アニメーションを再開させる
            _this.touchCharactor.Dir = Rf.ETS.FrameWork.Direction.Up;
            _this.touchCharactor.ResumeAnime();
        });
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
        //タッチイベント用キャラクタのアニメーションを実行する
        this.touchCharactor.Run();
    };
    return GameMain;
}(Rf.ETS.FrameWork.GameMain));
//メインクラスのインスタンス作成
createMain(GameMain);
