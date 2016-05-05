/**
 * タップ時に表示する演出用クラス
*/
class Particle {
    private isShowtParticle: boolean = false;
    private particles: Array<Rf.ETS.FrameWork.NoImageSprite> = new Array<Rf.ETS.FrameWork.NoImageSprite>();
    private particlePer: number = 0;
    private particleX: number;
    private particleY: number;

    /**
     * コンストラクタ
    */
    public constructor(parent: enchant.Group) {
        for (var index = 0; index < 12; index++) {
            var particle: Rf.ETS.FrameWork.NoImageSprite = new Rf.ETS.FrameWork.NoImageSprite(4, 4, parent);
            particle.SetSurface("rgb(32,128,255)");
            particle.touchEnabled = false;
            particle.visible = false;
            particle.opacity = 0.75;
            this.particles.push(particle);
        }
    }

    public SetParticle(x: number, y: number):void {
        this.particleX = x;
        this.particleY = y;
        this.particlePer = 0.0;
        this.isShowtParticle = true;
        for (var index = 0; index < this.particles.length; index++) {
            this.particles[index].x = x;
            this.particles[index].y = y;
            this.particles[index].visible = true;
        }
    }

    public Run(): void  {
        if (this.isShowtParticle) {
            this.particlePer += 0.125;

            if (this.particlePer < 1.0) {
                var addRad: number = (Math.PI * 2) / 12;
                var rad: number = Math.PI * this.particlePer * 1.0;
                var distance: number = 50.0 * Math.sin(-Math.PI * this.particlePer * 0.5);
                for (var index = 0; index < this.particles.length; index++) {
                    this.particles[index].x = this.particleX + distance * Math.sin(rad);
                    this.particles[index].y = this.particleY + distance * Math.cos(rad);
                    this.particles[index].opacity = 1.0 - 0.25 * this.particlePer;
                    rad += addRad;
                }
            } else {
                for (var index = 0; index < this.particles.length; index++) {
                    this.particles[index].visible = false;
                }
                this.isShowtParticle = false;
            }
        }
    }
}

/**
 * メインクラス
*/
class GameMain  extends Rf.ETS.FrameWork.GameMain
{
        private static SelectCharacterGroupX: number = (320 / 2) - 16;
        private selectCharacterBase: Rf.ETS.FrameWork.Group = null;

        private characters: Array<Rf.ETS.FrameWork.Character> = new Array<Rf.ETS.FrameWork.Character>();
        private charaIndex: number = 0;

        private group: Rf.ETS.FrameWork.Group = null;
        private particle: Particle;
        private loginButton: Rf.ETS.FrameWork.Sprite;
        private isShowMessage: boolean = false;
        private messageSurface: Rf.ETS.FrameWork.NoImageSprite;
        private messageLabel: Rf.ETS.FrameWork.Label;
        private messagePer: number = 0.0;

        /**
         * 初期化イベント
         * @method
         * @name FrameWork.GameMain#onInitialize
         */
        protected onInitialize():void
        {
            //サイズを320x480に変更
            this.screenWidth = 320;
            this.screenHeight = 480;
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
            this.resourceManager.AddResourceName("titleImage", "title.png");
            this.resourceManager.AddResourceName("loginImage", "login.png");
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

            //キャラ選択グループ
            this.selectCharacterBase = new Rf.ETS.FrameWork.Group(this.group);
            this.selectCharacterBase.y = (480 / 2) - 16;

            //キャラクタインスタンス作成とグループへの追加
            this.charaIndex = 0;
            if (sessionStorage.getItem("charaIndex") != null) {
                this.charaIndex = parseInt(sessionStorage.getItem("charaIndex"), 10);
            }
            for (var index = 0; index < 13; index++) {
                this.characters.push(new Rf.ETS.FrameWork.Character(32, 32, this.selectCharacterBase));
                this.characters[index].FileName = this.resourceManager.GetResourceName("charaImage");
                this.characters[index].charaIndex = index;
                this.characters[index].maxWaitCount = 3;
                this.characters[index].Dir = Rf.ETS.FrameWork.Direction.Down;
                this.characters[index].x = 48 * (index % 7);
                this.characters[index].y = 48 * Math.floor(index / 7);
                this.characters[index].addEventListener(enchant.Event.TOUCH_START, (e: any) => {
                    if (this.isShowMessage === false) {
                        this.charaIndex = e.target.charaIndex;
                        this.displayCharacters();

                        this.particle.SetParticle(e.x, e.y);
                    }
                });
            }
            this.displayCharacters();

            //タイトル
            var title: Rf.ETS.FrameWork.Sprite = new Rf.ETS.FrameWork.Sprite(320, 100, parent);
            title.FileName = this.resourceManager.GetResourceName("titleImage");

            //ログインボタン
            this.loginButton = new Rf.ETS.FrameWork.Sprite(100, 48, parent);
            this.loginButton.FileName = this.resourceManager.GetResourceName("loginImage");
            this.loginButton.x = (this.screenWidth - 100) / 2;
            this.loginButton.y = this.screenHeight - 48;
            var loginText = new Rf.ETS.FrameWork.Label(parent);
            loginText.text = "ログイン";
            loginText.width = 100;
            loginText.x = this.loginButton.x + 4;
            loginText.y = this.loginButton.y + 16;
            loginText.touchEnabled = false;
            loginText.textAlign = "center";

            //ログインメッセージ
            var messageGroup: Rf.ETS.FrameWork.Group = new Rf.ETS.FrameWork.Group(parent);
            messageGroup.y = 240;

            this.messageSurface = new Rf.ETS.FrameWork.NoImageSprite(320, 100, messageGroup);
            this.messageSurface.SetSurface("rgb(128,128,128)");
            this.messageSurface.visible = false;
            this.messageSurface.opacity = 0.5;
            this.messageSurface.originY = 50.0;
            this.messageSurface.scaleY = 0.0;

            this.messageLabel = new Rf.ETS.FrameWork.Label(messageGroup);
            this.messageLabel.text = "ログイン処理が走ります。";
            this.messageLabel.width = 320;
            this.messageLabel.y = 50;
            this.messageLabel.textAlign = "center";
            this.messageLabel.visible = false;

            //パーティクル作成
            this.particle = new Particle(parent);

            //ログイン処理
            this.loginButton.addEventListener(enchant.Event.TOUCH_END, (e: any) => {
                if (this.isShowMessage === false) {
                    this.messagePer = 0.0;
                    this.isShowMessage = true;
                    this.messageSurface.visible = true;
                    this.particle.SetParticle(e.x, e.y);
                }
            });

            //メッセージクリック
            this.messageSurface.addEventListener(enchant.Event.TOUCH_END, (e: any) => {
                this.isShowMessage = false;
                this.messageSurface.visible = false;
                this.messageLabel.visible = false;
            });
        }
        
        /**
         * 実行イベント
         * @method
         * @name FrameWork.GameMain#onRun
         */
        protected onRun():void
        {
            //ログインボタンクリック時のメッセージ表示
            if (this.isShowMessage) {
                if (this.messagePer < 1.0) {
                    this.messagePer += 0.125;
                    if (this.messagePer >= 1.0) {
                        this.messagePer = 1.0;
                        this.messageLabel.visible = true;

                        this.login(this, this.charaIndex, this.messageLabel);
                    }
                    this.messageSurface.scaleY = Math.sin(Math.PI * this.messagePer * 0.75);
                }
            }

            //選択キャラをアニメーションさせる
            this.characters[this.charaIndex].Run();

            //パーティクル表示
            this.particle.Run();
        }

        /**
         * ログイン処理
        */
        private login(instance: GameMain, playerIndex: number, label: Rf.ETS.FrameWork.Label): void {
          //TODO サーバとの通信処理などを行う

          //選択されたキャラクタをsessionStorageに格納
          sessionStorage.setItem("charaIndex", playerIndex.toString());
        }


        /**
         * キャラクタ選択時の表示切替処理
        */
        private displayCharacters(): void {
            for (var index = 0; index < 13; index++) {
                if (this.charaIndex != index) {
                    this.characters[index].opacity = 0.25;
                } else {
                    this.characters[index].opacity = 1.0;
                }
            }
        }
} 
//メインクラスのインスタンス作成
createMain(GameMain);