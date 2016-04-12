declare module enchant {
    class Event{
      /**
       * An event which is occurring when a new frame is beeing processed.
       * Issued object: {@link enchant.Core}, {@link enchant.Node}
       * @type String
       */
      static ENTER_FRAME: string;

        /**
         * An event dispatched when an Entity is rendered.
         * Issued by: {@link enchant.Entity}
         * @type String
         */
        static RENDER: string;

        /**
         * An event dispatched when a touch event intersecting a Node begins.
         * A mouse event counts as a touch event. Issued by: {@link enchant.Node}
         * @type String
         */
         static TOUCH_START: string;

        /**
         * An event dispatched when a touch event intersecting the Node has been moved.
         * A mouse event counts as a touch event. Issued by: {@link enchant.Node}
         * @type String
         */
        static TOUCH_MOVE: string;

        /**
        * An event dispatched when a touch event intersecting the Node ends.
        * A mouse event counts as a touch event. Issued by: {@link enchant.Node}
        * @type String
        */
        static TOUCH_END: string;
    }

    class Core{
      constructor(width:number , height:number);

      static instance:Core;

      onload:(e)=>void;
      currentScene:Scene;
      on(eventName:string,func:(arg:any)=>void);
      fps:number;

      /**
       * The width of the core screen.
       * @type Number
       */
      width:number;

      /**
       * The height of the core screen.
       * @type Number
       */
      height:number;

      /**
       * The scaling of the core rendering.
       * @type Number
       */
      scale:number;

      /**
       * File preloader.
       *
       * Loads the files specified in the parameters when
       * {@link enchant.Core#start} is called.
       * When all files are loaded, a {@link enchant.Event.LOAD}
       * event is dispatched from the Core object. Depending on the
       * type of each file, different objects will be created and
       * stored in {@link enchant.Core#assets} Variable.
       *
       * When an image file is loaded, a {@link enchant.Surface} is
       * created. If a sound file is loaded, an {@link enchant.Sound}
       * object is created. Any other file type will be accessible
       * as a string.
       *
       * In addition, because this Surface object is created with
       * {@link enchant.Surface.load}, it is not possible to
       * manipulate the image directly.
       * Refer to the {@link enchant.Surface.load} documentation.
       *
       * @example
       * core.preload('player.gif');
       * core.onload = function() {
       *     var sprite = new Sprite(32, 32);
       *     sprite.image = core.assets['player.gif']; // Access via path
       *     ...
       * };
       * core.start();
       *
       * @param {...String|String[]} assets Path of images to be preloaded.
       * Multiple settings possible.
       * @return {enchant.Core} this
       */
      preload(assets):Core;

      assets:Array<enchant.Surface>;

      /**
       * Start the core.
       *
       * Sets the framerate of the {@link enchant.Core#currentScene}
       * according to the value stored in {@link enchant.core#fps}. If
       * there are images to preload, loading will begin and the
       * loading screen will be displayed.
       * @return {enchant.Deferred}
       */
      start(deferred?:any):Deferred;

      getTime():number;

      /**
       * Stops the core.
       *
       * The frame will not be updated, and player input will not be accepted anymore.
       * Core can be restarted using {@link enchant.Core#resume}.
       */
      stop();

      /**
       * Stops the core.
       *
       * The frame will not be updated, and player input will not be accepted anymore.
       * Core can be started again using {@link enchant.Core#resume}.
       */
      pause();

      /**
       * Resumes core operations.
       */
      resume();

      /**
       * Switches to a new Scene.
       *
       * Scenes are controlled using a stack, with the top scene on
       * the stack being the one displayed.
       * When {@link enchant.Core#pushScene} is executed, the Scene is
       * placed top of the stack. Frames will be only updated for the
       * Scene which is on the top of the stack.
       *
       * @param {enchant.Scene} scene The new scene to display.
       * @return {enchant.Scene} The new Scene.
       */
      pushScene(scene):Scene;

      /**
       * Ends the current Scene and returns to the previous Scene.
       *
       * Scenes are controlled using a stack, with the top scene on
       * the stack being the one displayed.
       * When {@link enchant.Core#popScene} is executed, the Scene at
       * the top of the stack is removed and returned.
       *
       * @return {enchant.Scene} Removed Scene.
       */
      popScene():Scene;

      /**
       * Overwrites the current Scene with a new Scene.
       *
       * Executes {@link enchant.Core#popScene} and {@link enchant.Core#pushScene}
       * one after another to replace the current scene with the new scene.
       *
       * @param {enchant.Scene} scene The new scene with which to replace the current scene.
       * @return {enchant.Scene} The new Scene.
       */
      replaceScene(scene:Scene):Scene;

      /**
       * Removes a Scene from the Scene stack.
       *
       * If the scene passed in as a parameter is not the current
       * scene, the stack will be searched for the given scene.
       * If the given scene does not exist anywhere in the stack,
       * this method returns null.
       *
       * @param {enchant.Scene} scene Scene to be removed.
       * @return {enchant.Scene} The deleted Scene.
       */
      removeScene(scene:Scene):Scene;

      /**
       * Get the core time (not actual) elapsed since {@link enchant.Core#start} was called.
       * @return {Number} Time elapsed (in seconds).
       */
      getElapsedTime():number;
    }

    /**
     * @scope enchant.Node.prototype
     */
    class Node{
        /**
         * Move the Node to the given target location.
         * @param {Number} x Target x coordinates.
         * @param {Number} y Target y coordinates.
         */
        moveTo(x, y);

        /**
         * Move the Node relative to its current position.
         * @param {Number} x x axis movement distance.
         * @param {Number} y y axis movement distance.
         */
        moveBy(x, y);

        /**
         * x coordinates of the Node.
         * @type Number
         */
        x:number;

        /**
         * y coordinates of the Node.
         * @type Number
         */
        y:number;

        remove();
    }

    /**
     * @scope enchant.Entity.prototype
     */
    class Entity extends Node{
        /**
         * The width of the Entity.
         * @type Number
         */
        width:number;

        /**
         * The height of the Entity.
         * @type Number
         */
        height:number;

        /**
         * The Entity background color.
         * Must be provided in the same format as the CSS 'color' property.
         * @type String
         */
        backgroundColor:string;

        /**
         * The Entity debug color.
         * Must be provided in the same format as the CSS 'color' property.
         * @type String
         */
        debugColor:string;

        /**
         * The transparency of this entity.
         * Defines the transparency level from 0 to 1
         * (0 is completely transparent, 1 is completely opaque).
         * @type Number
         */
        opacity:number;

        /**
         * Indicates whether or not to display this Entity.
         * @type Boolean
         */
        visible:boolean;

        /**
         * Indicates whether or not this Entity can be touched.
         * @type Boolean
         */
        touchEnabled:boolean;

        /**
         * Performs a collision detection based on whether or not the bounding rectangles are intersecting.
         * @param {*} other An object like Entity, with the properties x, y, width, height, which are used for the
         * collision detection.
         * @return {Boolean} True, if a collision was detected.
         */
        intersect(other:Entity):boolean;

        /**
         * Performs a collision detection based on distance from the Entity's central point.
         * @param {*} other An object like Entity, with properties x, y, width, height, which are used for the
         * collision detection.
         * @param {Number} [distance] The greatest distance to be considered for a collision.
         * The default distance is the average of both objects width and height.
         * @return {Boolean} True, if a collision was detected.
         */
        within(other:Entity, distance:number):boolean;

        /**
         * Enlarges or shrinks this Entity.
         * @param {Number} x Scaling factor on the x axis.
         * @param {Number} [y] Scaling factor on the y axis.
         */
        scale(x:number, y:number);

        /**
         * Rotate this Entity.
         * @param {Number} deg Rotation angle (degree).
         */
        rotate(deg:number);

        /**
         * Scaling factor on the x axis of this Entity.
         * @type Number
         */
        scaleX:number;

        /**
         * Scaling factor on the y axis of this Entity.
         * @type Number
         */
        scaleY:number;

        /**
         * Entity rotation angle (degree).
         * @type Number
         */
        rotation:number;

        /**
         * The point of origin used for rotation and scaling.
         * @type Number
         */
        originX:number;

        /**
         * The point of origin used for rotation and scaling.
         * @type Number
         */
        originY:number;

        /**
         */
        enableCollection();

        /**
         */
        disableCollection();

        getBoundingRect():{left:number,top:number,width:number,height:number};

        getOrientedBoundingRect():{leftTop:number,rightTop:number,leftBottom:number,rightBottom:number};
    }

    /**
     * @scope enchant.Sprite.prototype
     */
    class Sprite extends Entity
    {
        /**
         * @name enchant.Sprite
         * @class
         * Class which can display images.
         * @param {Number} width Sprite width.
         * @param {Number} height Sprite height.
         *
         * @example
         * var bear = new Sprite(32, 32);
         * bear.image = core.assets['chara1.gif'];
         *
         * @constructs
         * @extends enchant.Entity
         */
        constructor(width:number, height:number);

        /**
         * Image displayed in the Sprite.
         * @type enchant.Surface
         */
        image:Surface;

        /**
         * Indizes of the frames to be displayed.
         * Frames with same width and height as Sprite will be arrayed from upper left corner of the
         * {@link enchant.Sprite#image} image. When a sequence of numbers is provided, the displayed frame
         * will switch automatically. At the end of the array the sequence will restart. By setting
         * a value within the sequence to null, the frame switching is stopped.
         *
         * @example
         * var sprite = new Sprite(32, 32);
         * sprite.frame = [0, 1, 0, 2]
         * //-> 0, 1, 0, 2, 0, 1, 0, 2,..
         * sprite.frame = [0, 1, 0, 2, null]
         * //-> 0, 1, 0, 2, (2, 2,.. :stop)
         *
         * @type Number|Array
         */
        frame:number;
    }

    /**
     * @scope enchant.Label.prototype
     */
    class Label extends Entity
    {
        /**
         * @name enchant.Label
         * @class
         * A class for Label object.
         * @constructs
         * @extends enchant.Entity
         */
        constructor(text:string);

        text:string;

        /**
         * Specifies horizontal alignment of text.
         * Can be set according to the format of the CSS 'text-align' property.
         * @type String
         */
        textAlign:string;

        /**
         * Font settings.
         * Can be set according to the format of the CSS 'font' property.
         * @type String
         */
        font:string;

        /**
         * Text color settings.
         * Can be set according to the format of the CSS 'color' property.
         * @type String
         */
        color:string;
    }

    /**
     * @scope enchant.Map.prototype
     */
    class Map extends Entity
    {
        /**
         * @name enchant.Map
         * @class
         * A class to create and display maps from a tile set.
         * @param {Number} tileWidth Tile width.
         * @param {Number} tileHeight Tile height.
         * @constructs
         * @extends enchant.Entity
         */
        constructor(tileWidth:number, tileHeight:number);

        /**
         * Set map data.
         * Sets the tile data, whereas the data (two-dimensional array with indizes starting from 0)
         * is mapped on the image starting from the upper left corner.
         * When more than one map data array is set, they are displayed in reverse order.
         * @param {...Number[][]} data Two-dimensional array of tile indizes. Multiple designations possible.
         */
        loadData(...data:Array<any>);

        /**
         * Checks what tile is present at the given position.
         * @param {Number} x x coordinates of the point on the map.
         * @param {Number} y y coordinates of the point on the map.
         * @return {*} The tile data for the given position.
         */
        checkTile(x:number, y:number):number;

        /**
         * Judges whether or not obstacles are on top of Map.
         * @param {Number} x x coordinates of detection spot on map.
         * @param {Number} y y coordinates of detection spot on map.
         * @return {Boolean} True, if there are obstacles.
         */
        hitTest(x:number, y:number):boolean;

        /**
         * Image with which the tile set is displayed on the map.
         * @type enchant.Surface
         */
        image:Surface;

        /**
         * Map tile width.
         * @type Number
         */
        tileWidth:number;

        /**
         * Map tile height.
         * @type Number
         */
        tileHeight:number;

        /**
         * @private
         */
        width:number;

        /**
         * @private
         */
        height:number;

        /**
         * @private
         */
        redraw(x:number, y:number, width:number, height:number);
    }

    /**
     * @scope enchant.Group.prototype
     */
    class Group extends Node
    {
        /**
         * Adds a Node to the Group.
         * @param {enchant.Node} node Node to be added.
         */
        addChild(node:Node);
                /**
         * Incorporates Node into Group.
         * @param {enchant.Node} node Node to be incorporated.
         * @param {enchant.Node} reference Node in position before insertion.
         */
        insertBefore(node:Node, reference:Node);

        /**
         * Remove a Node from the Group.
         * @param {enchant.Node} node Node to be deleted.
         */
        removeChild(node:Node);

        /**
         * The Node which is the first child.
         * @type enchant.Node
         */
        firstChild:Node;

        /**
         * The Node which is the last child.
         * @type enchant.Node
         */
        lastChild:Node;

        /**
        * Group rotation angle (degree).
        * @type Number
        */
        rotation:number;

        /**
        * Scaling factor on the x axis of the Group.
        * @type Number
        * @see enchant.Group#originX
        * @see enchant.Group#originY
        */
        scaleX:number;

        /**
        * Scaling factor on the y axis of the Group.
        * @type Number
        * @see enchant.Group#originX
        * @see enchant.Group#originY
        */
        scaleY:number;

        /**
        * origin point of rotation, scaling
        * @type Number
        */
        originX:number;

        /**
        * origin point of rotation, scaling
        * @type Number
        */
        originY:number;

    }

    /**
     * @scope enchant.Scene.prototype
     */
    class Scene extends Group
    {
        width:number;
        height:number;
        backgroundColor:string;
    }

    /**
     * @scope enchant.CanvasScene.prototype
     */
    class CanvasScene extends Scene
    {
    }

    /**
     * @scope enchant.Surface.prototype
     */
    class Surface extends EventTarget
    {
        /**
         * @name enchant.Surface
         * @class
         * Class that wraps canvas elements.
         *
         * Can be used to set the {@link enchant.Sprite} and {@link enchant.Map}'s image properties to be displayed.
         * If you wish to access Canvas API use the {@link enchant.Surface#context} property.
         *
         * @example
         * // Creates Sprite that displays a circle.
         * var ball = new Sprite(50, 50);
         * var surface = new Surface(50, 50);
         * surface.context.beginPath();
         * surface.context.arc(25, 25, 25, 0, Math.PI*2, true);
         * surface.context.fill();
         * ball.image = surface;
         *
         * @param {Number} width Surface width.
         * @param {Number} height Surface height.
         * @constructs
         * @extends enchant.EventTarget
         */
        constructor(width:number, height:number);

        context:any;

        /**
         * Returns 1 pixel from the Surface.
         * @param {Number} x The pixel's x coordinates.
         * @param {Number} y The pixel's y coordinates.
         * @return {Number[]} An array that holds pixel information in [r, g, b, a] format.
         */
        getPixel(x:number, y:number):Array<number>;

        /**
         * Sets one pixel within the surface.
         * @param {Number} x The pixel's x coordinates.
         * @param {Number} y The pixel's y coordinates.
         * @param {Number} r The pixel's red level.
         * @param {Number} g The pixel's green level.
         * @param {Number} b The pixel's blue level.
         * @param {Number} a The pixel's transparency.
         */
        setPixel(x:number, y:number, r:number, g:number, b:number, a:number);

        /**
         * Clears all Surface pixels and makes the pixels transparent.
         */
        clear();

        /**
         * Draws the content of the given Surface onto this surface.
         *
         * Wraps Canvas API drawImage and if multiple arguments are given,
         * these are getting applied to the Canvas drawImage method.
         *
         * @example
         * var src = core.assets['src.gif'];
         * var dst = new Surface(100, 100);
         * dst.draw(src);         // Draws source at (0, 0)
         * dst.draw(src, 50, 50); // Draws source at (50, 50)
         * // Draws just 30 horizontal and vertical pixels of source at (50, 50)
         * dst.draw(src, 50, 50, 30, 30);
         * // Takes the image content in src starting at (10,10) with a (Width, Height) of (40,40),
         * // scales it and draws it in this surface at (50, 50) with a (Width, Height) of (30,30).
         * dst.draw(src, 10, 10, 40, 40, 50, 50, 30, 30);
         *
         * @param {enchant.Surface} image Surface used in drawing.
         */
        draw(image:Surface);
                /**
         * Copies Surface.
         * @return {enchant.Surface} The copied Surface.
         */
        clone():Surface;

        /**
         * Creates a data URI scheme from this Surface.
         * @return {String} The data URI scheme that identifies this Surface and
         * can be used to include this Surface into a dom tree.
         */
        toDataURL():string;

        /**
         * Loads an image and creates a Surface object out of it.
         *
         * It is not possible to access properties or methods of the {@link enchant.Surface#context}, or to call methods using the Canvas API -
         * like {@link enchant.Surface#draw}, {@link enchant.Surface#clear}, {@link enchant.Surface#getPixel}, {@link enchant.Surface#setPixel}.. -
         * of the wrapped image created with this method.
         * However, it is possible to use this surface to draw it to another surface using the {@link enchant.Surface#draw} method.
         * The resulting surface can then be manipulated. (when loading images in a cross-origin resource sharing environment,
         * pixel acquisition and other image manipulation might be limited).
         *
         * @param {String} src The file path of the image to be loaded.
         * @param {Function} callback on load callback.
         * @param {Function} [onerror] on error callback.
         * @static
         * @return {enchant.Surface} Surface
         */
        load(src:string, callback:()=>void, onerror:()=>void);
    }

    class Deferred
    {
            /**
             * @param {Function} func
             */
            next(func:(any)=>any):any;

            /**
             * @param {Function} func
             */
            error(func:(any)=>any):any;

            /**
             * @param {*} arg
             */
            call(arg:any):any;

            /**
             * @param {*} arg
             */
            fail(arg:any):any;


            /**
             * @param {Object|enchant.Deferred[]} arg
             * @return {enchant.Deferred}
             *
             * @example
             * // array
             * enchant.Deferred
             *     .parallel([
             *         enchant.Deferred.next(function() {
             *             return 24;
             *         }),
             *         enchant.Deferred.next(function() {
             *             return 42;
             *         })
             *     ])
             *     .next(function(arg) {
             *         console.log(arg); // [ 24, 42 ]
             *     });
             * // object
             * enchant.Deferred
             *     .parallel({
             *         foo: enchant.Deferred.next(function() {
             *             return 24;
             *         }),
             *         bar: enchant.Deferred.next(function() {
             *             return 42;
             *         })
             *     })
             *     .next(function(arg) {
             *         console.log(arg.foo); // 24
             *         console.log(arg.bar); // 42
             *     });
             *
             * @static
             */
            parallel(arg:any):any;
          }

}
declare function enchant();

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
         * @name FrameWork.GameMain#resourceLoad
         */
        protected onResourceSetting(): void;
        /**
         * 初期化イベント
         * @method
         * @name FrameWork.GameMain#onInit
         * @param {Object} parent - 親Group
         */
        protected onInit(parent: enchant.Group): void;
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
