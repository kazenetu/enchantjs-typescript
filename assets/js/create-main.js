function createMain(gameMainClass) {
    function onLoaded() {
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
        window.addEventListener("resize", function (event) {
            orientationChange();
        });
        window.addEventListener("orientationchange", function (event) {
            orientationChange();
        });

        //余白部分をドラッグすることによるスクロールを無効にする
        document.getElementById("base").addEventListener("touchstart", function (event) {
            if (event.target.id === "base") {
                event.preventDefault();
            }
        });

        //初回時のスクリーン設定
        orientationChange();

        //enchantjsの画面サイズの設定
        function _resetScreen(gameWidth, gameHeight) {

            //ベースの幅を画面いっぱいに広げる
            var base = document.getElementById("base");
            base.style.width = window.innerWidth + "px";
            base.style.height = window.innerHeight + "px";

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
            var stage = document.getElementById("enchant-stage");

            //div enchant-stage配下のdiv（その配下にcanvasが格納されている）に
            //スケールを設定
            stage.children[stage.childElementCount - 1].style.transform = "scale(" + scale + ")";

            //enchantjsの画面を中央に寄せる
            var left, top;
            if (orientation === "portrait") {
                top = (window.innerHeight - height) * 0.5;
                left = 0;
            } else {
                top = 0;
                left = (window.innerWidth - width) * 0.5;
            }
            stage.style.height = height;
            stage.style.width = width;
            stage.style.position = "absolute";
            stage.style.left = left + "px";
            stage.style.top = top + "px";
            stage.style.backgroundColor = "white";

            //スクロール位置を0,0に設定
            window.screenTop = 0;
            window.screenLeft = 0;

            //enchant.Coreへの反映情報として連想配列を返す
            return { "scale": scale, "left": left, "top": top };
        }
    }

    // DOMContentLoadedがすでに完了していないか確認する
    if (document.readyState !== 'loading') {
        onLoaded();
    } else {
        document.addEventListener('DOMContentLoaded', onLoaded);
    }
}


