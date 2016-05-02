namespace Rf.ETS.FrameWork {
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
            this.fileName = value;
            this.image = enchant.Core.instance.assets[this.fileName];
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
