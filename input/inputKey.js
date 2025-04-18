export function inputKey() {
        const keys = {
                right: {pressed: false},
                left:  {pressed: false},
                jump:  {pressed: false}
        };
        // windowのkeydownイベントをトリガーにして、処理の実行を行う
        // アロー関数を使用して、eventオブジェクトに引数を渡す。アロー関数とは、関数を簡潔に書くための構文
        window.addEventListener("keydown", (event) => {
                // console.log(keyCode)
                // switch分は条件分岐を行うための構文
                switch (event.key) {
                        // aキーが押された場合
                        case "a":
                        console.log("a down");
                        keys.left.pressed = true;
                        // keysオブジェクトのleftプロパティのpressedプロパティをtrueにする
                        // keys.left.pressed = true;
                        // breakeを使用しないと、次のcaseも実行される。
                        break;
                
                        // dキーが押された場合
                        case "d":
                        console.log("d down");
                        // keysオブジェクトのrightプロパティのpressedプロパティをtrueにする
                        // keys.right.pressed = true;
                        keys.right.pressed = true;
                        break;
                
                        // wキーが押された場合
                        case "w":
                        console.log("w down");
                        // player.velocity.y -= 15;
                        keys.jump.pressed = true;
                        break;
                
                        // sキーが押された場合
                        case "s":
                        console.log("s down");
                        break;
                }
        });
      
        window.addEventListener("keyup", (event) => {
                // console.log(event.key);
                // switch分は条件分岐を行うための構文
                switch (event.key) {
                        // aキーが離れた場合
                        case "a":
                        console.log("a up");
                        // keys.left.pressed = false;
                        // brakeを使用しないと、次のcaseも実行される。
                        keys.left.pressed = false;
                        break;
                
                        // dキーが離れた場合
                        case "d":
                        console.log("d up");
                        // keys.right.pressed = false;
                        // player.velocity.x = 0
                        keys.right.pressed = false;
                        break;
                
                        // wキーが離れた場合
                        case "w":
                        console.log("w up");
                        keys.jump.pressed = false;
                        break;
                
                        // sキーが離れた場合
                        case "s":
                        console.log("s up");
                        break;
                }
        });

        // keysを返す
        return keys;
}