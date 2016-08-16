namespace Rf.ETS.FrameWork {
    /**
     * キャラクタの向き
     * @memberof FrameWork
     */
    export enum Direction {
        Up = 0,
        Left = 1,
        Down = 2,
        Right = 3
    }

    /**
     * キャラクタ
     * @classdesc キャラクタクラス
     * @constructor
     * @memberof FrameWork
     * @extends FrameWork.Sprite
     */
    export class Character extends Rf.ETS.FrameWork.Sprite implements Rf.ETS.FrameWork.IRunnable 
    {
        public charaIndex: number = 0;
        
        /**
         * キャラクタの向き
         * @prop
         * @name UIParts.Character#Character
         */
        public set Dir(value: Direction) {
            this.dir = value;
            this.SetFrame();
        }

        /**
         * アニメーション間隔(Runメソッド呼び出し)
         */
        public maxWaitCount:number = 4;

        /**
         * Dirプロパティに対応したY位置の配列
         * ※必ず4要素が必要
         * 初期値：[0,1,2,3]
         * @prop
         * @name UIParts.Character#Character
         */
        public set DirIndexs(value:Array<number>){
            if(value.length !== 4){
                this.dirIndexs = value;
            }
        }

        /**
         * アニメーションパターン
         * 初期値：[0,1]
         * @prop
         * @name UIParts.Character#Character
         */
        public set AnimePattern(value:Array<number>){
            this.animePattern = value;
        }

        /**
         * アニメーションの幅
         * 初期値：2
         * @prop
         * @name UIParts.Character#Character
         */
        public set AnimeWidth(value:number){
            this.animeTipWidth = value;
        }

        protected dir: Direction = Direction.Down;
        protected dirIndexs:Array<number> = [0,1,2,3];
        protected animeIndex: number = 0;
        protected animePattern:Array<number> = [0,1];
        protected animeTipWidth: number = 2;
        protected waitCount: number = 0;
        protected isRunAnime:boolean = true;
        protected imageTipWidth:number = 0;

        /**
         * コンストラクタ
         * @method
         * @name UIParts.Character#Character
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} parent - 親Group
         */
        public constructor(width: number, height: number, parent: enchant.Group)
        {
            super(width, height, parent);
        }

        /**
         * 初期化処理
         */
        public Init():void
        {
            this.SetFrame();
        }

        /**
         * 実行処理実行
         * @method
         * @name UIParts.Character#Run
         * @return {boolean} 処理結果を返す
         */
        public Run(): boolean 
        {
            if(this.SetAnime()){
                //フレーム処理
                this.SetFrame();
            }
            return true;
        }
        
        /**
         * アニメ処理の休止
         * @method
         * @name UIParts.Character#SuspendAnime
         */
        public SuspendAnime():void{
            this.isRunAnime = false;
        }

        /**
         * アニメ処理の再開
         * @method
         * @name UIParts.Character#ResumeAnime
         */
        public ResumeAnime():void{
            this.isRunAnime = true;
        }
        
        /**
         * アニメ処理の状態取得
         * @method
         * @name UIParts.Character#IsRunAnime
         * @return {boolean} 実行中はtrue 停止中はfalse
         */
        public IsRunAnime():boolean{
            return this.isRunAnime;
        }

        /**
         * アニメ実行
         * @method
         * @name UIParts.Character#SetAnime
         * @return {boolean} フレーム更新実施の可否
         */
        protected SetAnime():boolean 
        {
            if(this.isRunAnime === false){
                return false;
            }
            let isUpdateFrame:boolean = true;
            
            if(this.maxWaitCount <= 0){
                return false;
            }else{
                if(this.waitCount < this.maxWaitCount){
                    isUpdateFrame=false;
                }
                this.waitCount++;
            }
            
            if(isUpdateFrame){
                this.animeIndex++;
                if (this.animeIndex >= this.animePattern.length) {
                    this.animeIndex = 0;
                }
                this.waitCount = 0;
            }

            return isUpdateFrame;
        }
        
        /**
         * フレームの更新
         * @method
         * @name UIParts.Character#SetFrame
         * @return {boolean} フレーム更新実施の可否
         */
        protected SetFrame():void{
            if (this.imageTipWidth <= 0) {
                if (this.image !== null) {
                    this.imageTipWidth = Math.floor(this.image.width / this.width);
                }
            }
            this.frame = this.charaIndex * this.animeTipWidth +
                         this.animePattern[this.animeIndex] +  
                         this.dirIndexs[this.dir] * this.imageTipWidth;
        }
    }
}
