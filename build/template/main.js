var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        _super.apply(this, arguments);
    }
    //TODO プロパティやフィールドを記述してください。
    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    GameMain.prototype.onInitialize = function () {
        //TODO 画面サイズやfpsの変更を記述してください。
    };
    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    GameMain.prototype.onResourceSetting = function () {
        //TODO this.resourceManager.SetResourcePathメソッドでリソースのルートパスを設定してください。
        //例）
        //this.resourceManager.SetResourcePath("../../assets/resources/");
        //TODO リソースのキーとファイルパスを記述してください。
        //例）
        //this.resourceManager.AddResourceName("charaImage", "chara.png");
    };
    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    GameMain.prototype.onLoad = function (parent) {
        //TODO プロパティやフィールドのインスタンスを生成してください。
        //TODO イベントを記述してください。
    };
    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    GameMain.prototype.onRun = function () {
        //TODO 呼び出されるたびに実行する処理を記述してください。
    };
    return GameMain;
}(Rf.ETS.FrameWork.GameMain));
//メインクラスのインスタンス作成
createMain(GameMain);
