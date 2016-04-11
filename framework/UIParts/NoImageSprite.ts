namespace Rf.ETS.FrameWork {
    /**
     * イメージ無しスプライトUI
     * @classdesc イメージ無しスプライトUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Sprite
     */
    export class NoImageSprite extends enchant.Sprite 
    {

        /**
         * コンストラクタ
         * @method
         * @name FrameWork.NoImageSprite#NoImageSprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} parent - 親Group
         */
        public constructor(width: number, height: number, parent: enchant.Group) 
        {
            super(width,height);
            parent.addChild(this);
        }

        /**
         * 塗りつぶし情報の設定
         * @method
         * @name FrameWork.NoImageSprite#SetSurface
         * @param {string} fillStyle - 塗りつぶし情報
         */
        public SetSurface(fillStyle: string): void 
        {
            let rfView = new enchant.Surface(this.width , this.height);
            rfView.context.beginPath();
            rfView.context.fillStyle = fillStyle;
            rfView.context.rect(0, 0, this.width, this.height);
            rfView.context.fill();
            this.image = rfView;
        }
    }
}
