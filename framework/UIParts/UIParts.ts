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

    /**
     * マップUI
     * @classdesc マップUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Map
     */
    export class Map extends enchant.Map 
    {
      protected fileName: string;

        /**
         * コンストラクタ
         * @method
         * @name FrameWork.Map#Map
         * @param {number} tipWidth - マップチップサイズ.幅
         * @param {number} tipHeight - マップチップサイズ.高さ
         * @param {Object} parent - 親Group
         */
        public constructor(tipWidth: number, tipHeight: number, parent: enchant.Group) 
        {
            super(tipWidth,tipHeight);
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
          if(this.fileName !== value)
          {
            this.image = enchant.Core.instance.assets[this.fileName];
            this.fileName = value;
          }
        }

        /**
         * マップ情報の読み込み
         * @method
         * @name FrameWork.Map#LoadData
         * @param {Array} mapData - マップ情報（２次元配列）
         */
        public LoadData(mapData: any): void 
        {
            this.loadData(mapData);
        }

        /**
         * 複数のマップ情報の読み込み
         * @method
         * @name FrameWork.Map#LoadDatas
         * @param {Array} mapData0 - 前景マップ情報（２次元配列）
         * @param {Array} mapData1 - 背景マップ情報（２次元配列）
         */
        public LoadDatas(mapData0: any, mapData1: any): void 
        {
            this.loadData(mapData0, mapData1);
        }
    }
}
