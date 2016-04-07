enchant();

let screenWidth=640;
let screenHeight=480;

//Start
var game = new enchant.Core(screenWidth, screenHeight);
game.fps = 10;
game.preload([]);

//ロード完了イベント
game.onload = function () {
/*
    if (isNaN(game._pageX)) {
        game._pageX = 0;
        game._pageY = 0;
    }
*/

    var mainPanel = new enchant.Group();
//    game.currentScene._element.style.overflow = 'visible';
    game.currentScene.addChild(mainPanel);

    //CreateStage
    var stage = new enchant.Group();
    mainPanel.addChild(stage);

    //CreateGroup
    var group = new enchant.Group();
    stage.addChild(group);

    //mainInstance.Init(stage);
    //画像無しスプライトインスタンス作成
    var surface: enchant.Sprite = new enchant.Sprite(100, 100);
    surface.image = new enchant.Surface(surface.width,surface.height);
    surface.image.context.beginPath();
    surface.image.context.fillStyle = "rgb(128,255,255)";
    surface.image.context.rect(0, 0, surface.width,surface.height);
    surface.image.context.fill();
    surface.opacity = 0.5;
    group.addChild(surface);

    //グループメンバとしてラベルインスタンス作成
    var label = new enchant.Label("サンプルラベル");
    group.addChild(label);

    game.on(enchant.Event.ENTER_FRAME, function () {
      //グループを右に移動する
      group.x += 2;
      if (group.x >= 100) {
          group.x = 0;
      }

      //グループ内メンバのラベルを下に移動する
      label.y += 2;
      if (label.y >= 100) {
          label.y = 0;
      }
    });
};
game.start();
