namespace Rf.ETS.FrameWork {
    /**
     * ゲームメイン処理
     * @classdesc ゲームメインクラス
     * @constructor
     * @memberof FrameWork
     */
    export class GameMain 
    {
        /**
         * リソース管理
         */
        protected resourceManager: ResourceManager;

        /**
         * スクリーンサイズ：幅
         */
        protected screenWidth:number = 640;

        /**
         * スクリーンサイズ：高さ
         */
        protected screenHeight:number = 480;

        /**
         * enchant.Coreインスタンス
         */
        protected enchantInstance:enchant.Core;

        /**
         * コンストラクタ
         * @method
         * @name FrameWork.GameMain#GameMain
         */
        public constructor() 
        {
            this.resourceManager = new ResourceManager();
            this.resourceManager.SetResourcePath("assets/resources/");

            enchant();
            
            //create enchantInstance 
            this.enchantInstance = new enchant.Core(this.screenWidth,this.screenHeight);
            this.enchantInstance.fps = 10;
            
            //リソース設定イベント
            this.onResourceSetting();

            //リソースロード
            this.enchantInstance.preload(this.resourceManager.GetResourceNames());

            this.enchantInstance.onload = (e)=>{
                //Create Stage
                let stage = new enchant.Group();
                this.enchantInstance.currentScene.addChild(stage);

                //ロードイベント
                this.onLoad(stage);
                
                //フレーム処理                        
                this.enchantInstance.on(enchant.Event.ENTER_FRAME, () => {
                    this.onRun();
                });
            }
            this.enchantInstance.start();
        }

        /**
         * リソース設定イベント
         * @method
         * @name FrameWork.GameMain#onResourceSetting
         */
        protected onResourceSetting():void
        {
            
        }
        
        /**
         * ロードイベント
         * @method
         * @name FrameWork.GameMain#onLoad
         * @param {Object} parent - 親Group
         */
        protected onLoad(parent: enchant.Group):void
        {
        }
        
        /**
         * 実行イベント
         * @method
         * @name FrameWork.GameMain#onRun
         */
        protected onRun():void
        {
            
        }
    }

}
