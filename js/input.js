// オブジェクトリテラルを使用してkeyの状態を管理する
 // 初期値はfalseを設定する
export const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
 }
// 下記のように書くと押下されたキーのkeyCodeを取得することができる
// window.addEventListener("keydown", (event) => {
//    console.log(event)
// })

// addEventListenerはイベントを監視するためのメソッド
// windowのkeydownイベントをトリガーにして、処理の実行を行う
// アロー関数を使用して、eventオブジェクトに引数を渡す。アロー関数とは、関数を簡潔に書くための構文
export function setupInput(keys, player) {
    window.addEventListener("keydown", (event) => {
        // console.log(keyCode)
        // switch分は条件分岐を行うための構文
        switch(event.key) {
            // aキーが押された場合
            case "a":
                console.log("left")
                // keysオブジェクトのleftプロパティのpressedプロパティをtrueにする
                keys.left.pressed = true
                // brakeを使用しないと、次のcaseも実行される。
                break
            // dキーが押された場合
            case "d":
                console.log("right")
                // keysオブジェクトのrightプロパティのpressedプロパティをtrueにする
                keys.right.pressed = true
                break
            // wキーが押された場合
            case "w":
                console.log("up")
                player.velocity.y - 10
                break
            // sキーが押された場合
            case "s":
                console.log("down")
                break
        }
    })

    // 指定のキーが話された場合の処理
    window.addEventListener("keyup", (event) => {
        // console.log(keyCode)
        // switch分は条件分岐を行うための構文
        switch(event.key) {
            // aキーが離れた場合
            case "a":
                console.log("left")
                keys.left.pressed = false
                // brakeを使用しないと、次のcaseも実行される。
                break
            // dキーが離れた場合
            case "d":
                console.log("right")
                keys.right.pressed = false
                // player.velocity.x = 0
                break
            // wキーが離れた場合
            case "w":
                console.log("up")
                player.velocity.y -= 20
                break
            // sキーが離れた場合
            case "s":
                console.log("down")
                break
        }
    })
}