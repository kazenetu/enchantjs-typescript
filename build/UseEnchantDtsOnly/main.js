enchant();
var screenWidth = 640;
var screenHeight = 640;
//Start
var game = new enchant.Core(screenWidth, screenHeight);
game.fps = 30;
game.preload(['../../assets/resources/chara.png']);
//ロード完了イベント
game.onload = function () {
    var mainPanel = new enchant.Group();
    game.currentScene.addChild(mainPanel);
    //CreateStage
    var stage = new enchant.Group();
    mainPanel.addChild(stage);
    //CreateGroup
    var group = new enchant.Group();
    group.y = 100;
    stage.addChild(group);
    //画像無しスプライトインスタンス作成
    var surface = new enchant.Sprite(100, 100);
    surface.image = new enchant.Surface(surface.width, surface.height);
    surface.image.context.beginPath();
    surface.image.context.fillStyle = "rgb(128,255,255)";
    surface.image.context.rect(0, 0, surface.width, surface.height);
    surface.image.context.fill();
    surface.opacity = 0.5;
    group.addChild(surface);
    //スプライトインスタンス作成
    var sprite = new enchant.Sprite(32, 32);
    sprite.image = game.assets['../../assets/resources/chara.png'];
    sprite.originX = 16; //中心で回転するように設定
    sprite.originY = 16; //中心で回転するように設定
    sprite.frame = 26 * 2; //サンプル画像で正面画像を表示する
    group.addChild(sprite);
    //タッチイベント用キャラクタ
    var isAnime = true;
    var dir = 0;
    var charaIndex = 3;
    var maxWaitCount = 3;
    var waitCount = 0;
    var anime = 0;
    var touchCharactor = new enchant.Sprite(32, 32);
    touchCharactor.image = game.assets['../../assets/resources/chara.png'];
    touchCharactor.x = 32;
    touchCharactor.y = 32;
    touchCharactor.originX = 16 * 2;
    touchCharactor.originY = 16 * 2;
    touchCharactor.frame = charaIndex * 2 + 26 * dir;
    touchCharactor.scale(2.0, 2.0);
    mainPanel.addChild(touchCharactor);
    var touchCharactorTouchPosX = 0;
    var touchCharactorTouchPosY = 0;
    touchCharactor.addEventListener(enchant.Event.TOUCH_START, function (e) {
        //タッチ開始時は前を向いて、アニメーションを停止させる
        dir = 2;
        touchCharactor.frame = charaIndex * 2 + 26 * dir;
        isAnime = false;
        touchCharactorTouchPosX = touchCharactor.x - e.x;
        touchCharactorTouchPosY = touchCharactor.y - e.y;
    });
    touchCharactor.addEventListener(enchant.Event.TOUCH_MOVE, function (e) {
        //タッチ中はその位置にキャラクタを移動させる
        touchCharactor.x = e.x + touchCharactorTouchPosX;
        touchCharactor.y = e.y + touchCharactorTouchPosY;
    });
    touchCharactor.addEventListener(enchant.Event.TOUCH_END, function (e) {
        //タッチ終了時は後ろを向いて、アニメーションを再開させる
        dir = 0;
        isAnime = true;
    });
    game.on(enchant.Event.ENTER_FRAME, function () {
        //グループを右に移動する
        group.x += 2;
        if (group.x >= 100) {
            group.x = 0;
        }
        //グループ内メンバのスプライトを回転させる
        sprite.rotation += 5;
        if (sprite.rotation >= 360) {
            sprite.rotation = 0;
        }
        //タッチイベント用キャラクタのアニメーションを実行する
        if (isAnime) {
            if (waitCount >= maxWaitCount) {
                anime++;
                if (anime >= 4) {
                    anime = 0;
                }
                waitCount = 0;
            }
            waitCount++;
            touchCharactor.frame = charaIndex * 2 + 26 * dir;
            if (anime >= 2) {
                touchCharactor.frame += 1;
            }
        }
    });
};
game.start();
