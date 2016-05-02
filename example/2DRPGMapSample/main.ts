/**
 * メインクラス
*/
class GameMain  extends Rf.ETS.FrameWork.GameMain
{
        private group: Rf.ETS.FrameWork.Group = null;
        
        private mapHeight:number = 0;
        private mapWidth:number = 0;
        private mapCol:any = null;

        /**
         * 初期化イベント
         * @method
         * @name FrameWork.GameMain#onInitialize
         */
        protected onInitialize():void
        {
            //サイズを320x480に変更
            this.screenWidth = 320;
            this.screenHeight = 480;
        }

       /**
         * リソース設定イベント
         * @method
         * @name FrameWork.GameMain#resourceLoad
         */
        protected onResourceSetting():void
        {
            this.resourceManager.SetResourcePath("./assets/");
            this.resourceManager.AddResourceName("mapImage", "resources/map1.gif");
            this.resourceManager.AddResourceName("charaImage", "resources/chara.png");
            this.resourceManager.AddResourceName("cursorImage", "resources/cursor.png");
            this.resourceManager.AddResourceName("exitImage", "resources/menu_exit.png");
            this.resourceManager.AddResourceName("mapData", "data/mapdata.json");
        }
        
        /**
         * ロードイベント
         * @method
         * @name FrameWork.GameMain#onLoad
         * @param {Object} parent - 親Group
         */
        protected onLoad(parent: enchant.Group):void
        {
            //グループインスタンス作成
            this.group = new Rf.ETS.FrameWork.Group(parent);
            this.group.y = 50;

            //背景用マップの読み込み
            let map = new Rf.ETS.FrameWork.Map(16, 16, this.group);
            map.FileName = this.resourceManager.GetResourceName("mapImage");
            let mapdata:any = JSON.parse(enchant.Core.instance.assets[this.resourceManager.GetResourceName("mapData")]);
            map.loadData(mapdata.map0,mapdata.map1);
            
            //マップ情報の設定
            this.mapHeight =mapdata.map0.length;
            this.mapWidth = mapdata.map0[0].length;
            this.mapCol = mapdata.mapCol;

            //TODO キャラクタの設定

            //前景用マップの読み込み
            // var foregroundMap = new Rf.ETS.FrameWork.Map(16, 16, this.group);
            // foregroundMap.FileName = this.resourceManager.GetResourceName("mapImage");
            // foregroundMap.LoadData(mapdata.foreMap);

            //TODO タッチ用スプライトの追加
        }
        
        /**
         * 実行イベント
         * @method
         * @name FrameWork.GameMain#onRun
         */
        protected onRun():void
        {
        }
} 
//メインクラスのインスタンス作成
createMain(GameMain);