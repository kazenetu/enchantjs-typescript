namespace Rf.ETS.FrameWork {
    /**
     * グループUI
     * @classdesc グループUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Group
     */
    export class Group extends enchant.Group 
    {

        /**
         * コンストラクタ
         * @method
         * @name FrameWork.Group#Group
         * @param {Object} parent - 親Group
         */
        public constructor(parent: enchant.Group) 
        {
            super();
            parent.addChild(this);
        }
    }
}
