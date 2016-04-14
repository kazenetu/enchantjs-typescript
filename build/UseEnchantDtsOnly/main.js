enchant();
var screenWidth = 640;
var screenHeight = 480;
//Start
var game = new enchant.Core(screenWidth, screenHeight);
game.fps = 10;
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
    });
};
game.start();
