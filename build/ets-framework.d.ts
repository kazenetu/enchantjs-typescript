declare namespace Rf.ETS.FrameWork {
    /**
     * グループUI
     * @classdesc グループUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Group
     */
    class Group extends enchant.Group {
        /**
         * コンストラクタ
         * @method
         * @name FrameWork.Group#Group
         * @param {Object} parent - 親Group
         */
        constructor(parent: enchant.Group);
    }
}

declare namespace Rf.ETS.FrameWork {
    /**
     * ラベルUI
     * @classdesc ラベルUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Label
     */
    class Label extends enchant.Label {
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Label#Label
         * @param {Object} parent - Group
         */
        constructor(parent: enchant.Group);
    }
}

declare namespace Rf.ETS.FrameWork {
    /**
     * マップUI
     * @classdesc マップUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Map
     */
    class Map extends enchant.Map {
        protected fileName: string;
        /**
         * コンストラクタ
         * @method
         * @name FrameWork.Map#Map
         * @param {number} tipWidth - マップチップサイズ.幅
         * @param {number} tipHeight - マップチップサイズ.高さ
         * @param {Object} parent - 親Group
         */
        constructor(tipWidth: number, tipHeight: number, parent: enchant.Group);
        /**
         * ファイル名プロパティ
         * @method
         * @name FrameWork.Sprite#Sprite
         * @param {string} value - ファイル名
         */
        FileName: string;
        /**
         * マップ情報の読み込み
         * @method
         * @name FrameWork.Map#LoadData
         * @param {Array} mapData - マップ情報（２次元配列）
         */
        LoadData(mapData: any): void;
        /**
         * 複数のマップ情報の読み込み
         * @method
         * @name FrameWork.Map#LoadDatas
         * @param {Array} mapData0 - 前景マップ情報（２次元配列）
         * @param {Array} mapData1 - 背景マップ情報（２次元配列）
         */
        LoadDatas(mapData0: any, mapData1: any): void;
    }
}

declare namespace Rf.ETS.FrameWork {
    /**
     * スプライトUI
     * @classdesc スプライトUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Sprite
     */
    class Sprite extends enchant.Sprite {
        protected fileName: string;
        /**
         * コンストラクタ
         * @method
         * @name FrameWork.Sprite#Sprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} parent - 親Group
         */
        constructor(width: number, height: number, parent: enchant.Group);
        /**
         * ファイル名プロパティ
         * @method
         * @name FrameWork.Sprite#Sprite
         * @param {string} value - ファイル名
         */
        FileName: string;
    }
}

declare namespace Rf.ETS.FrameWork {
    /**
     * イメージ無しスプライトUI
     * @classdesc イメージ無しスプライトUIクラス
     * @constructor
     * @memberof FrameWork
     * @extends enchant.Sprite
     */
    class NoImageSprite extends enchant.Sprite {
        /**
         * コンストラクタ
         * @method
         * @name FrameWork.NoImageSprite#NoImageSprite
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} parent - 親Group
         */
        constructor(width: number, height: number, parent: enchant.Group);
        /**
         * 塗りつぶし情報の設定
         * @method
         * @name FrameWork.NoImageSprite#SetSurface
         * @param {string} fillStyle - 塗りつぶし情報
         */
        SetSurface(fillStyle: string): void;
    }
}

declare namespace Rf.ETS.FrameWork {
    /**
     * キャラクタ
     * @classdesc キャラクタクラス
     * @constructor
     * @memberof FrameWork
     * @extends FrameWork.Sprite
     */
    class Character extends Rf.ETS.FrameWork.Sprite implements Rf.ETS.FrameWork.IRunnable {
        charaIndex: number;
        waitCount: number;
        dir: number;
        anime: number;
        /**
         * コンストラクタ
         * @method
         * @name UIParts.Character#Character
         * @param {number} width - 表示サイズ.幅
         * @param {number} height - 表示サイズ.高さ
         * @param {Object} parent - 親Group
         */
        constructor(width: number, height: number, parent: enchant.Group);
        /**
         * 実行処理実行
         * @method
         * @name UIParts.Character#Run
         * @return {boolean} 処理結果を返す
         */
        Run(): boolean;
        /**
         * アニメ実行
         * @method
         * @name UIParts.Character#SetAnime
         */
        SetAnime(): void;
    }
}

declare namespace Rf.ETS.FrameWork {
    /**
     * ゲームメイン処理
     * @classdesc ゲームメインクラス
     * @constructor
     * @memberof FrameWork
     */
    class GameMain {
        /**
         * リソース管理
         */
        protected resourceManager: ResourceManager;
        /**
         * スクリーンサイズ：幅
         */
        protected screenWidth: number;
        /**
         * スクリーンサイズ：高さ
         */
        protected screenHeight: number;
        /**
         * enchant.Coreインスタンス
         */
        protected enchantInstance: enchant.Core;
        /**
         * コンストラクタ
         * @method
         * @name FrameWork.GameMain#GameMain
         */
        constructor();
        /**
         * リソース設定イベント
         * @method
         * @name FrameWork.GameMain#onResourceSetting
         */
        protected onResourceSetting(): void;
        /**
         * ロードイベント
         * @method
         * @name FrameWork.GameMain#onLoad
         * @param {Object} parent - 親Group
         */
        protected onLoad(parent: enchant.Group): void;
        /**
         * 実行イベント
         * @method
         * @name FrameWork.GameMain#onRun
         */
        protected onRun(): void;
    }
}

declare namespace Rf.ETS.FrameWork {
    /**
     * リソース情報
     * @classdesc リソース情報クラス
     * @constructor
     * @memberof Base
     */
    class Resource {
        Keyword: string;
        FileName: string;
        /**
         * コンストラクタ
         * @method
         * @name Base.Resource#Resource
         * @param {string} keyword - リソースのキー
         * @param {string} fileName - リソース名
         */
        constructor(keyword: string, fileName: string);
    }
    /**
     * リソース管理
     * @classdesc リソース管理クラス
     * @constructor
     * @memberof Base
     */
    class ResourceManager {
        private resources;
        private resourcePath;
        /**
         * コンストラクタ
         * @method
         * @name Base.ResourceManager#ResourceManager
         */
        constructor();
        SetResourcePath(path: string): void;
        /**
        * リソース名を追加
        * @method
        * @name Base.ResourceManager#AddResourceName
        * @param {string} keyword - リソースのキー
        * @param {string} fileName - リソース名
         */
        AddResourceName(keyword: string, fileName: string): void;
        /**
        * リソースの配列を取得
        * @method
        * @name Base.ResourceManager#GetResourceNames
        * @return {string} リソースの配列を返す
         */
        GetResourceNames(): Array<string>;
        /**
         * リソース名を取得
         * @method
         * @name Base.ResourceManager#GetResourceName
         * @param {string} keyword - リソースのキー
         * @return {string} リソース名を返す
         */
        GetResourceName(keyword: string): string;
    }
}

/// <reference path="UIParts/Group.d.ts" />
/// <reference path="UIParts/Label.d.ts" />
/// <reference path="UIParts/Map.d.ts" />
/// <reference path="UIParts/Sprite.d.ts" />
/// <reference path="UIParts/NoImageSprite.d.ts" />
/// <reference path="UIParts/Character.d.ts" />
/// <reference path="Base/GameMain.d.ts" />
/// <reference path="Base/ResourceManager.d.ts" />

declare namespace Rf.ETS.FrameWork {
    /**
     * 実行可能インターフェース
    */
    interface IRunnable {
        /**
         * 実行処理実行
        */
        Run(): boolean;
    }
}
