import { Player } from "./player.js"
import { Platform } from "./platform.js"
import { keys } from "./input.js"
import { setupInput } from "./input.js"
import { gravity } from "./player.js"

// 1⃣canvasの実装
// canvasを取得する
const canvas = document.querySelector("canvas")

// canvasの2Dコンテキストを取得する
// 2Dコンテキストはcanvasに描画するためのAPIを提供している
const c = canvas.getContext("2d")

// canvasの幅と高さを設定する
canvas.width = innerWidth
canvas.height = innerHeight - 10

 // playerクラスのインスタンスを生成する
 const player = new Player()

 // platformクラスのインスタンスを生成する
 // const platform = new Platform()

 // 6⃣複数のplatformの実装
 const platforms = [new Platform(c, {x: 200, y: 100}), new Platform(c, {x: 300, y: 300})]
 
// animate関数はアニメーションを実行するための関数
 function animate() {
    // 大体60fpsのアニメーション処理を行う
    // 自身でanimate関数を呼び出し、ループしてアニメーションを実現する
    requestAnimationFrame(animate)

    // clearRectでcanvasの原点(0, 0)から幅と高さを指定して削除する
    // この処理で一つ前のフレームを消すことができる
    c.clearRect(0, 0, canvas.width, canvas.height)

    // その後updateメソッドを呼び出して、playerの位置を更新する
    player.update()

    platforms.forEach(platform => {
        platform.draw()
    })

    // platformのdrawメソッドを呼び出して、platformを描画する
    // platform.draw()
 }

// animate関数を呼び出してアニメーションを開始する
animate()
