namespace Rf.ETS.FrameWork {
    /**
     * リソース情報
     * @classdesc リソース情報クラス
     * @constructor
     * @memberof Base
     */
    export class Resource 
    {
        public Keyword: string;
        public FileName: string;

        /**
         * コンストラクタ
         * @method
         * @name Base.Resource#Resource
         * @param {string} keyword - リソースのキー
         * @param {string} fileName - リソース名
         */
        public constructor(keyword: string, fileName: string) 
        {
            this.Keyword = keyword;
            this.FileName = fileName;
        }
    }

    /**
     * リソース管理
     * @classdesc リソース管理クラス
     * @constructor
     * @memberof Base
     */
    export class ResourceManager 
    {
        private resources: Array<Resource>;

        private resourcePath: string;

        /**
         * コンストラクタ
         * @method
         * @name Base.ResourceManager#ResourceManager
         */
        public constructor() {
            this.resourcePath = "";
            this.resources = new Array<Resource>();
        }
        
        public SetResourcePath(path:string):void{
            this.resourcePath = path;
        }

        /**
        * リソース名を追加
        * @method
        * @name Base.ResourceManager#AddResourceName
        * @param {string} keyword - リソースのキー
        * @param {string} fileName - リソース名
         */
        public AddResourceName(keyword: string, fileName: string): void 
        {
            this.resources.push(new Resource(keyword, this.resourcePath + fileName));
        }

        /**
        * リソースの配列を取得
        * @method
        * @name Base.ResourceManager#GetResourceNames
        * @return {string} リソースの配列を返す
         */
        public GetResourceNames(): Array<string> 
        {
            var result: Array<string> = new Array<string>();

            this.resources.forEach((value, index) => {
                result.push(value.FileName);
            });

            return result;
        }

        /**
         * リソース名を取得
         * @method
         * @name Base.ResourceManager#GetResourceName
         * @param {string} keyword - リソースのキー
         * @return {string} リソース名を返す
         */
        public GetResourceName(keyword: string): string 
        {
            var result: string = "";

            this.resources.filter((value) => {
                if (value.Keyword === keyword) {
                    result = value.FileName;
                    return false;
                }
            });

            return result;
        }
    }
}
