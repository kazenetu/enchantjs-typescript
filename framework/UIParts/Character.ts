namespace Rf.ETS.FrameWork {
    /**
     * キャラクタの向き
     * @memberof FrameWork
     */
    export enum Direction {
        Up = 0,
        Right = 1,
        Down = 2,
        Left = 3
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
        
        public set Dir(value: Direction) {
            this.dir = value;
            this.SetFrame();
        }
        public maxWaitCount:number = 1;

        protected dir: Direction = Direction.Down;
        protected waitCount: number = 0;
        protected anime: number = 0;
        protected isRunAnime:boolean = true;

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
                this.anime++;
                if (this.anime >= 4) {
                    this.anime = 0;
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
            this.frame = this.charaIndex * 2 + this.dir * 26;
            if (this.anime >= 2) {
                this.frame += 1;
            }
        }
    }
}
