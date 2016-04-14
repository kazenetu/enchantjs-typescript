class GameMain  extends Rf.ETS.FrameWork.GameMain
{
        private group: Rf.ETS.FrameWork.Group = null;
        private sprite: Rf.ETS.FrameWork.Sprite = null;

       /**
         * リソース設定イベント
         * @method
         * @name FrameWork.GameMain#resourceLoad
         */
        protected onResourceSetting():void
        {
            this.resourceManager.SetResourcePath("../../assets/resources/");
            this.resourceManager.AddResourceName("charaImage", "chara.png");
        }
        
        /**
         * ロードイベント
         * @method
         * @name FrameWork.GameMain#onLoad
         * @param {Object} parent - 親Group
         */
        protected onLoad(parent: enchant.Group):void
        {
            //グループインスタンス作成
            this.group = new Rf.ETS.FrameWork.Group(parent);
            this.group.y = 100;

            //画像無しスプライトインスタンス作成
            let surface: Rf.ETS.FrameWork.NoImageSprite = 
                new Rf.ETS.FrameWork.NoImageSprite(100, 100, this.group);
            surface.SetSurface("rgb(128,255,255)");
            surface.opacity = 0.5;

            //スプライトインスタンス作成
            this.sprite = new Rf.ETS.FrameWork.Sprite(32, 32, this.group);
            this.sprite.FileName = this.resourceManager.GetResourceName("charaImage");
            this.sprite.originX = 16; //中心で回転するように設定
            this.sprite.originY = 16; //中心で回転するように設定
            this.sprite.frame = 26*2; //サンプル画像で正面画像を表示する
        }
        
        /**
         * 実行イベント
         * @method
         * @name FrameWork.GameMain#onRun
         */
        protected onRun():void
        {
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
        }
} 
//メインクラスのインスタンス作成
createMain(GameMain);