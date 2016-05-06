class GameMain extends Rf.ETS.FrameWork.GameMain {
    //TODO プロパティやフィールドを記述してください。

    /**
     * 初期化イベント
     * @method
     * @name FrameWork.GameMain#onInitialize
     */
    protected onInitialize(): void {
        //TODO 画面サイズやfpsの変更を記述してください。
    }

    /**
      * リソース設定イベント
      * @method
      * @name FrameWork.GameMain#resourceLoad
      */
    protected onResourceSetting(): void {
        //TODO this.resourceManager.SetResourcePathメソッドでリソースのルートパスを設定してください。
        //例）
        //this.resourceManager.SetResourcePath("../../assets/resources/");
        
        //TODO リソースのキーとファイルパスを記述してください。
        //例）
        //this.resourceManager.AddResourceName("charaImage", "chara.png");
    }

    /**
     * ロードイベント
     * @method
     * @name FrameWork.GameMain#onLoad
     * @param {Object} parent - 親Group
     */
    protected onLoad(parent: enchant.Group): void {
        //TODO プロパティやフィールドのインスタンスを生成してください。

        //TODO イベントを記述してください。

    }

    /**
     * 実行イベント
     * @method
     * @name FrameWork.GameMain#onRun
     */
    protected onRun(): void {
        //TODO 呼び出されるたびに実行する処理を記述してください。

    }
}
//メインクラスのインスタンス作成
createMain(GameMain);