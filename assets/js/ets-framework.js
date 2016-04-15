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
                            this.image = enchant.Core.instance.assets[this.fileName];
                            this.fileName = value;
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
                    this.waitCount = 0;
                    this.dir = Direction.Down;
                    this.anime = 0;
                }
                /**
                 * 実行処理実行
                 * @method
                 * @name UIParts.Character#Run
                 * @return {boolean} 処理結果を返す
                 */
                Character.prototype.Run = function () {
                    this.SetAnime();
                    //フレーム処理
                    this.frame = this.charaIndex * 2 + this.dir * 26;
                    if (this.anime >= 2) {
                        this.frame += 1;
                    }
                    return true;
                };
                /**
                 * アニメ実行
                 * @method
                 * @name UIParts.Character#SetAnime
                 */
                Character.prototype.SetAnime = function () {
                    if (++this.anime >= 4) {
                        this.anime = 0;
                    }
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
