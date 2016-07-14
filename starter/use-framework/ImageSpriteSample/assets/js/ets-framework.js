/* 
 * enchantjs-typescript 1.0.8
 * https://github.com/kazenetu/enchantjs-typescript
 * MIT License
 * 
 * Copyright (C) 2016 kazenetu
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * グループUI
             * @classdesc グループUIクラス
             * @constructor
             * @memberof FrameWork
             * @extends enchant.Group
             */
            var Group = (function (_super) {
                __extends(Group, _super);
                /**
                 * コンストラクタ
                 * @method
                 * @name FrameWork.Group#Group
                 * @param {Object} parent - 親Group
                 */
                function Group(parent) {
                    _super.call(this);
                    parent.addChild(this);
                }
                return Group;
            }(enchant.Group));
            FrameWork.Group = Group;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * ラベルUI
             * @classdesc ラベルUIクラス
             * @constructor
             * @memberof FrameWork
             * @extends enchant.Label
             */
            var Label = (function (_super) {
                __extends(Label, _super);
                /**
                 * コンストラクタ
                 * @method
                 * @name UIParts.Label#Label
                 * @param {Object} parent - Group
                 */
                function Label(parent) {
                    _super.call(this, "");
                    parent.addChild(this);
                }
                return Label;
            }(enchant.Label));
            FrameWork.Label = Label;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * マップUI
             * @classdesc マップUIクラス
             * @constructor
             * @memberof FrameWork
             * @extends enchant.Map
             */
            var Map = (function (_super) {
                __extends(Map, _super);
                /**
                 * コンストラクタ
                 * @method
                 * @name FrameWork.Map#Map
                 * @param {number} tipWidth - マップチップサイズ.幅
                 * @param {number} tipHeight - マップチップサイズ.高さ
                 * @param {Object} parent - 親Group
                 */
                function Map(tipWidth, tipHeight, parent) {
                    _super.call(this, tipWidth, tipHeight);
                    parent.addChild(this);
                    this.fileName = "";
                }
                Object.defineProperty(Map.prototype, "FileName", {
                    /**
                     * ファイル名プロパティ
                     * @method
                     * @name FrameWork.Sprite#Sprite
                     * @param {string} value - ファイル名
                     */
                    set: function (value) {
                        if (this.fileName !== value) {
                            this.fileName = value;
                            this.image = enchant.Core.instance.assets[this.fileName];
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * マップ情報の読み込み
                 * @method
                 * @name FrameWork.Map#LoadData
                 * @param {Array} mapData - マップ情報（２次元配列）
                 */
                Map.prototype.LoadData = function (mapData) {
                    this.loadData(mapData);
                };
                /**
                 * 複数のマップ情報の読み込み
                 * @method
                 * @name FrameWork.Map#LoadDatas
                 * @param {Array} mapData0 - 前景マップ情報（２次元配列）
                 * @param {Array} mapData1 - 背景マップ情報（２次元配列）
                 */
                Map.prototype.LoadDatas = function (mapData0, mapData1) {
                    this.loadData(mapData0, mapData1);
                };
                return Map;
            }(enchant.Map));
            FrameWork.Map = Map;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * スプライトUI
             * @classdesc スプライトUIクラス
             * @constructor
             * @memberof FrameWork
             * @extends enchant.Sprite
             */
            var Sprite = (function (_super) {
                __extends(Sprite, _super);
                /**
                 * コンストラクタ
                 * @method
                 * @name FrameWork.Sprite#Sprite
                 * @param {number} width - 表示サイズ.幅
                 * @param {number} height - 表示サイズ.高さ
                 * @param {Object} parent - 親Group
                 */
                function Sprite(width, height, parent) {
                    _super.call(this, width, height);
                    parent.addChild(this);
                    this.fileName = "";
                }
                Object.defineProperty(Sprite.prototype, "FileName", {
                    /**
                     * ファイル名プロパティ
                     * @method
                     * @name FrameWork.Sprite#Sprite
                     * @param {string} value - ファイル名
                     */
                    set: function (value) {
                        if (this.fileName !== value) {
                            this.fileName = value;
                            this.image = enchant.Core.instance.assets[this.fileName];
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                return Sprite;
            }(enchant.Sprite));
            FrameWork.Sprite = Sprite;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * イメージ無しスプライトUI
             * @classdesc イメージ無しスプライトUIクラス
             * @constructor
             * @memberof FrameWork
             * @extends enchant.Sprite
             */
            var NoImageSprite = (function (_super) {
                __extends(NoImageSprite, _super);
                /**
                 * コンストラクタ
                 * @method
                 * @name FrameWork.NoImageSprite#NoImageSprite
                 * @param {number} width - 表示サイズ.幅
                 * @param {number} height - 表示サイズ.高さ
                 * @param {Object} parent - 親Group
                 */
                function NoImageSprite(width, height, parent) {
                    _super.call(this, width, height);
                    parent.addChild(this);
                }
                /**
                 * 塗りつぶし情報の設定
                 * @method
                 * @name FrameWork.NoImageSprite#SetSurface
                 * @param {string} fillStyle - 塗りつぶし情報
                 */
                NoImageSprite.prototype.SetSurface = function (fillStyle) {
                    var rfView = new enchant.Surface(this.width, this.height);
                    rfView.context.beginPath();
                    rfView.context.fillStyle = fillStyle;
                    rfView.context.rect(0, 0, this.width, this.height);
                    rfView.context.fill();
                    this.image = rfView;
                };
                return NoImageSprite;
            }(enchant.Sprite));
            FrameWork.NoImageSprite = NoImageSprite;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * キャラクタの向き
             * @memberof FrameWork
             */
            (function (Direction) {
                Direction[Direction["Up"] = 0] = "Up";
                Direction[Direction["Right"] = 1] = "Right";
                Direction[Direction["Down"] = 2] = "Down";
                Direction[Direction["Left"] = 3] = "Left";
            })(FrameWork.Direction || (FrameWork.Direction = {}));
            var Direction = FrameWork.Direction;
            /**
             * キャラクタ
             * @classdesc キャラクタクラス
             * @constructor
             * @memberof FrameWork
             * @extends FrameWork.Sprite
             */
            var Character = (function (_super) {
                __extends(Character, _super);
                /**
                 * コンストラクタ
                 * @method
                 * @name UIParts.Character#Character
                 * @param {number} width - 表示サイズ.幅
                 * @param {number} height - 表示サイズ.高さ
                 * @param {Object} parent - 親Group
                 */
                function Character(width, height, parent) {
                    _super.call(this, width, height, parent);
                    this.charaIndex = 0;
                    /**
                     * アニメーション間隔(Runメソッド呼び出し)
                     */
                    this.maxWaitCount = 4;
                    this.dir = Direction.Down;
                    this.dirIndexs = [0, 1, 2, 3];
                    this.animeIndex = 0;
                    this.animePattern = [0, 1];
                    this.animeTipWidth = 2;
                    this.waitCount = 0;
                    this.isRunAnime = true;
                    this.imageTipWidth = 0;
                }
                Object.defineProperty(Character.prototype, "Dir", {
                    /**
                     * キャラクタの向き
                     * @prop
                     * @name UIParts.Character#Character
                     */
                    set: function (value) {
                        this.dir = value;
                        this.SetFrame();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Character.prototype, "DirIndexs", {
                    /**
                     * Dirプロパティに対応したY位置の配列
                     * ※必ず4要素が必要
                     * 初期値：[0,1,2,3]
                     * @prop
                     * @name UIParts.Character#Character
                     */
                    set: function (value) {
                        if (value.length !== 4) {
                            this.dirIndexs = value;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Character.prototype, "AnimePattern", {
                    /**
                     * アニメーションパターン
                     * 初期値：[0,1]
                     * @prop
                     * @name UIParts.Character#Character
                     */
                    set: function (value) {
                        this.animePattern = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Character.prototype, "AnimeWidth", {
                    /**
                     * アニメーションの幅
                     * 初期値：2
                     * @prop
                     * @name UIParts.Character#Character
                     */
                    set: function (value) {
                        this.animeTipWidth = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 初期化処理
                 */
                Character.prototype.Init = function () {
                    this.SetFrame();
                };
                /**
                 * 実行処理実行
                 * @method
                 * @name UIParts.Character#Run
                 * @return {boolean} 処理結果を返す
                 */
                Character.prototype.Run = function () {
                    if (this.SetAnime()) {
                        //フレーム処理
                        this.SetFrame();
                    }
                    return true;
                };
                /**
                 * アニメ処理の休止
                 * @method
                 * @name UIParts.Character#SuspendAnime
                 */
                Character.prototype.SuspendAnime = function () {
                    this.isRunAnime = false;
                };
                /**
                 * アニメ処理の再開
                 * @method
                 * @name UIParts.Character#ResumeAnime
                 */
                Character.prototype.ResumeAnime = function () {
                    this.isRunAnime = true;
                };
                /**
                 * アニメ処理の状態取得
                 * @method
                 * @name UIParts.Character#IsRunAnime
                 * @return {boolean} 実行中はtrue 停止中はfalse
                 */
                Character.prototype.IsRunAnime = function () {
                    return this.isRunAnime;
                };
                /**
                 * アニメ実行
                 * @method
                 * @name UIParts.Character#SetAnime
                 * @return {boolean} フレーム更新実施の可否
                 */
                Character.prototype.SetAnime = function () {
                    if (this.isRunAnime === false) {
                        return false;
                    }
                    var isUpdateFrame = true;
                    if (this.maxWaitCount <= 0) {
                        return false;
                    }
                    else {
                        if (this.waitCount < this.maxWaitCount) {
                            isUpdateFrame = false;
                        }
                        this.waitCount++;
                    }
                    if (isUpdateFrame) {
                        this.animeIndex++;
                        if (this.animeIndex >= this.animePattern.length) {
                            this.animeIndex = 0;
                        }
                        this.waitCount = 0;
                    }
                    return isUpdateFrame;
                };
                /**
                 * フレームの更新
                 * @method
                 * @name UIParts.Character#SetFrame
                 * @return {boolean} フレーム更新実施の可否
                 */
                Character.prototype.SetFrame = function () {
                    if (this.imageTipWidth <= 0) {
                        if (this.image !== null) {
                            this.imageTipWidth = Math.floor(this.image.width / this.width);
                        }
                    }
                    this.frame = this.charaIndex * this.animeTipWidth +
                        this.animePattern[this.animeIndex] +
                        this.dirIndexs[this.dir] * this.imageTipWidth;
                };
                return Character;
            }(Rf.ETS.FrameWork.Sprite));
            FrameWork.Character = Character;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * ゲームメイン処理
             * @classdesc ゲームメインクラス
             * @constructor
             * @memberof FrameWork
             */
            var GameMain = (function () {
                /**
                 * コンストラクタ
                 * @method
                 * @name FrameWork.GameMain#GameMain
                 */
                function GameMain() {
                    var _this = this;
                    /**
                     * スクリーンサイズ：幅
                     */
                    this.screenWidth = 640;
                    /**
                     * スクリーンサイズ：高さ
                     */
                    this.screenHeight = 480;
                    /**
                     * fps
                     */
                    this.fps = 10;
                    this.resourceManager = new FrameWork.ResourceManager();
                    this.resourceManager.SetResourcePath("assets/resources/");
                    enchant();
                    //初期化イベント
                    this.onInitialize();
                    //create enchantInstance 
                    this.enchantInstance = new enchant.Core(this.screenWidth, this.screenHeight);
                    this.enchantInstance.fps = this.fps;
                    //リソース設定イベント
                    this.onResourceSetting();
                    //リソースロード
                    this.enchantInstance.preload(this.resourceManager.GetResourceNames());
                    this.enchantInstance.onload = function (e) {
                        //Create Stage
                        var stage = new enchant.Group();
                        _this.enchantInstance.currentScene.addChild(stage);
                        //ロードイベント
                        _this.onLoad(stage);
                        //フレーム処理                        
                        _this.enchantInstance.on(enchant.Event.ENTER_FRAME, function () {
                            _this.onRun();
                        });
                    };
                    this.enchantInstance.start();
                }
                /**
                 * 初期化イベント
                 * @method
                 * @name FrameWork.GameMain#onInitialize
                 */
                GameMain.prototype.onInitialize = function () {
                };
                /**
                 * リソース設定イベント
                 * @method
                 * @name FrameWork.GameMain#onResourceSetting
                 */
                GameMain.prototype.onResourceSetting = function () {
                };
                /**
                 * ロードイベント
                 * @method
                 * @name FrameWork.GameMain#onLoad
                 * @param {Object} parent - 親Group
                 */
                GameMain.prototype.onLoad = function (parent) {
                };
                /**
                 * 実行イベント
                 * @method
                 * @name FrameWork.GameMain#onRun
                 */
                GameMain.prototype.onRun = function () {
                };
                return GameMain;
            }());
            FrameWork.GameMain = GameMain;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

var Rf;
(function (Rf) {
    var ETS;
    (function (ETS) {
        var FrameWork;
        (function (FrameWork) {
            /**
             * リソース情報
             * @classdesc リソース情報クラス
             * @constructor
             * @memberof Base
             */
            var Resource = (function () {
                /**
                 * コンストラクタ
                 * @method
                 * @name Base.Resource#Resource
                 * @param {string} keyword - リソースのキー
                 * @param {string} fileName - リソース名
                 */
                function Resource(keyword, fileName) {
                    this.Keyword = keyword;
                    this.FileName = fileName;
                }
                return Resource;
            }());
            FrameWork.Resource = Resource;
            /**
             * リソース管理
             * @classdesc リソース管理クラス
             * @constructor
             * @memberof Base
             */
            var ResourceManager = (function () {
                /**
                 * コンストラクタ
                 * @method
                 * @name Base.ResourceManager#ResourceManager
                 */
                function ResourceManager() {
                    this.resourcePath = "";
                    this.resources = new Array();
                }
                ResourceManager.prototype.SetResourcePath = function (path) {
                    this.resourcePath = path;
                };
                /**
                * リソース名を追加
                * @method
                * @name Base.ResourceManager#AddResourceName
                * @param {string} keyword - リソースのキー
                * @param {string} fileName - リソース名
                 */
                ResourceManager.prototype.AddResourceName = function (keyword, fileName) {
                    this.resources.push(new Resource(keyword, this.resourcePath + fileName));
                };
                /**
                * リソースの配列を取得
                * @method
                * @name Base.ResourceManager#GetResourceNames
                * @return {string} リソースの配列を返す
                 */
                ResourceManager.prototype.GetResourceNames = function () {
                    var result = new Array();
                    this.resources.forEach(function (value, index) {
                        result.push(value.FileName);
                    });
                    return result;
                };
                /**
                 * リソース名を取得
                 * @method
                 * @name Base.ResourceManager#GetResourceName
                 * @param {string} keyword - リソースのキー
                 * @return {string} リソース名を返す
                 */
                ResourceManager.prototype.GetResourceName = function (keyword) {
                    var result = "";
                    this.resources.filter(function (value) {
                        if (value.Keyword === keyword) {
                            result = value.FileName;
                            return false;
                        }
                    });
                    return result;
                };
                return ResourceManager;
            }());
            FrameWork.ResourceManager = ResourceManager;
        })(FrameWork = ETS.FrameWork || (ETS.FrameWork = {}));
    })(ETS = Rf.ETS || (Rf.ETS = {}));
})(Rf || (Rf = {}));

/// <reference path="./UIParts/Group.ts"/>
/// <reference path="./UIParts/Label.ts"/>
/// <reference path="./UIParts/Map.ts"/>
/// <reference path="./UIParts/Sprite.ts"/>
/// <reference path="./UIParts/NoImageSprite.ts"/>
/// <reference path="./UIParts/Character.ts"/>
/// <reference path="./Base/GameMain.ts"/>
/// <reference path="./Base/ResourceManager.ts"/>
