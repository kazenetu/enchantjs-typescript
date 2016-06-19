class GameMain  extends Rf.ETS.FrameWork.GameMain
{
        private group: Rf.ETS.FrameWork.Group = null;
        private sprite: Rf.ETS.FrameWork.Sprite = null;
        private touchCharactor: Rf.ETS.FrameWork.Character = null;
        private touchCharactorTouchPosX:number = 0;
        private touchCharactorTouchPosY:number = 0;

        /**
         * 初期化イベント
         * @method
         * @name FrameWork.GameMain#onInitialize
         */
        protected onInitialize():void
        {
            //サイズを640x640に変更
            this.screenHeight = 640;
            //fpsを10から30に変更
            this.fps = 30;
        }

       /**
         * リソース設定イベント
         * @method
         * @name FrameWork.GameMain#resourceLoad
         */
        protected onResourceSetting():void
        {
            this.resourceManager.SetResourcePath("./assets/resources/");
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

            //タッチイベント用キャラクタ
            this.touchCharactor = new Rf.ETS.FrameWork.Character(32,32,parent);
            this.touchCharactor.FileName = this.resourceManager.GetResourceName("charaImage");
            this.touchCharactor.charaIndex = 3;
            this.touchCharactor.Dir = Rf.ETS.FrameWork.Direction.Up;
            this.touchCharactor.x = 32;
            this.touchCharactor.y = 32;
            this.touchCharactor.originX = 16*2;
            this.touchCharactor.originY = 16*2;
            this.touchCharactor.scale(2.0,2.0);
            this.touchCharactor.maxWaitCount = 6;
            this.touchCharactor.addEventListener(enchant.Event.TOUCH_START,(e:enchant.Event)=>{
                //タッチ開始時は前を向いて、アニメーションを停止させる
                this.touchCharactor.Dir = Rf.ETS.FrameWork.Direction.Down;
                this.touchCharactor.SuspendAnime();

                this.touchCharactorTouchPosX = this.touchCharactor.x - e.x;
                this.touchCharactorTouchPosY = this.touchCharactor.y - e.y;
            });
            this.touchCharactor.addEventListener(enchant.Event.TOUCH_MOVE,(e:enchant.Event)=>{
                //タッチ中はその位置にキャラクタを移動させる
                this.touchCharactor.x = e.x + this.touchCharactorTouchPosX;
                this.touchCharactor.y = e.y + this.touchCharactorTouchPosY;
            });
            this.touchCharactor.addEventListener(enchant.Event.TOUCH_END,(e:enchant.Event)=>{
                //タッチ終了時は後ろを向いて、アニメーションを再開させる
                this.touchCharactor.Dir = Rf.ETS.FrameWork.Direction.Up;
                this.touchCharactor.ResumeAnime();
            });
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

            //タッチイベント用キャラクタのアニメーションを実行する
            this.touchCharactor.Run();
        }
} 
//メインクラスのインスタンス作成
createMain(GameMain);