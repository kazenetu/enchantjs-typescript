namespace Rf.ETS.FrameWork {
    /**
     * ラベルUI
     * @classdesc ラベルUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Label
     */
    export class Label extends enchant.Label 
    {
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Label#Label
         * @param {Object} parent - Group
         */
        public constructor(parent: enchant.Group) 
        {
            super("");
            parent.addChild(this);
        }
    }
}
