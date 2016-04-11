namespace Rf.ETS.FrameWork {
    /**
     * スプライトUI
     * @classdesc スプライトUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Sprite
     */
    export class Sprite extends enchant.Sprite 
    {
        protected fileName: string;

        /**
         * コンストラクタ
         * @method
         * @name FrameWork.Sprite#Sprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} parent - 親Group
         */
        public constructor(width: number, height: number,parent: enchant.Group) 
        {
            super(width,height);
            parent.addChild(this);

            this.fileName = "";
        }

        /**
         * ファイル名プロパティ
         * @method
         * @name FrameWork.Sprite#Sprite
         * @param {string} value - ファイル名
         */
        public set FileName(value:string)
        {
          if(this.fileName !== value){
            this.fileName = value;
            this.image = enchant.Core.instance.assets[this.fileName];
          }
        }
    }
}
