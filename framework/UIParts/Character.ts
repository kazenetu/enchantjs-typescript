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

        public waitCount: number = 0;
        public dir: Direction = Direction.Down;
        public anime: number = 0;

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
            this.SetAnime();

            //フレーム処理
            this.frame = this.charaIndex * 2 + this.dir * 26;
            if (this.anime >= 2) {
                this.frame += 1;
            }

            return true;
        }

        /**
         * アニメ実行
         * @method
         * @name UIParts.Character#SetAnime
         */
        public SetAnime():void 
        {
            if (++this.anime >= 4) {
                this.anime = 0;
            }
        }
    }
}
