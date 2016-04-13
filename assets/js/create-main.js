function createMain(gameMainClass){
    $(function () {
        //指定されたゲームメインクラスのインスタンスを作成
        var gameMainInstance = new gameMainClass();

        //回転時の処理
        var orientationChange = function () {
            var game = enchant.Core.instance;

            //画面サイズ設定
            var result = _resetScreen(game.width, game.height);

            //enchant.Coreへの変更情報を反映
            if (game !== null) {
                game.scale = result["scale"];
                game._pageX = result["left"];
                game._pageY = result["top"];
                game.dispatchEvent(enchant.Event.CORE_RESIZE);
            }
        };

        //回転イベント
        $(window).on("resize", function (event) {
            orientationChange();
        });
        $(window).on("orientationchange", function (event) {
            orientationChange();
        });

        //余白部分をドラッグすることによるスクロールを無効にする
        $("#base").on("touchstart", function (event) {
            if(event.target.id === "base"){
                event.preventDefault(); 
            }
        });

        //初回時のスクリーン設定
        orientationChange();

        //enchantjsの画面サイズの設定
        function _resetScreen(gameWidth, gameHeight) {

            //ベースの幅を画面いっぱいに広げる
            $("#base").width(window.innerWidth).height(window.innerHeight);

            //幅、高さのスケールを計算
            var scaleWidth = window.innerWidth / gameWidth;
            var scaleHeight = window.innerHeight / gameHeight;

            //スケールが小さい値を全体のスケールに設定
            var orientation = "";
            if (scaleWidth < scaleHeight) {
                orientation = "portrait";
                scale = scaleWidth;
            } else {
                orientation = "landscape";
                scale = scaleHeight;
            }

            //enchantjs-stageの画面サイズを計算
            var width = gameWidth * scale;
            var height = gameHeight * scale;

            //div enchant-stageを取得
            var stage = $("#enchant-stage");

            //div enchant-stage配下のdiv（その配下にcanvasが格納されている）に
            //スケールを設定
            var transformKey = "-" + enchant.ENV.VENDOR_PREFIX + "-transform";
            stage.children("div").css(transformKey, "scale(" + scale + ")");

            //enchantjsの画面を中央に寄せる
            var left, top;
            if (orientation == "portrait") {
                top = (window.innerHeight - height) * 0.5;
                left = 0;
            } else {
                top = 0;
                left = (window.innerWidth - width) * 0.5;
            }
            stage.height(height).width(width);
            stage.css({ "position": "absolute", "left": left + "px", "top": top + "px", "background-color": "white" });

            //スクロール位置を0,0に設定
            $(window).scrollLeft(0).scrollTop(0);

            //enchant.Coreへの反映情報として連想配列を返す
            return { "scale": scale, "left": left, "top": top };
        }
    });
}