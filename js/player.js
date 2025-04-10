// 2⃣playerの実装
// playerクラスを定義する
export class Player {
    // constructorメソッドはクラスのインスタンスを生成するためのメソッド
    // インスタンスを生成する際に呼び出される
    constructor() {
        // thisキーワードはクラスのインスタンスを指す
        // playerの初期位置を設定する
        this.position = {
            x: 100,
            y: 100
        }
        // playerの初期速度を設定する
        // y軸方向に+1の速度を持つ
        // heightはページの底が最も値が大きくなる
        this.velocity = {
            x: 0,
            y: 1
        }
        // playerの幅と高さを設定する
        this.width = 30
        this.height = 30
    }

    // drawメソッドはplayerを描画するためのメソッド
    draw() {
        // fillStyleは塗りつぶしの色を設定する
        c.fillStyle = "red"
        // fillRectは矩形を描画するメソッド
        // 処理時の位置を指定し、インスタンスの幅と高さで描画する
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    // updateメソッドはplayerの位置を更新するためのメソッド
    update() {
        // playerの位置を更新して描画する
        this.draw()
        // playerの位置を更新する
        // 落下速度がある時はy軸方向にpositionを更新する
        this.position.y += this.velocity.y

        // playerの位置がcanvasの底に達したら、y軸方向の速度を0にする
        // plyerの位置+playerの高さ+playerの速度がページの高さより小さい場合
        if(this.position.y + this.height + this.velocity.y <= canvas.height) 
            // 重力を加算してy軸方向に速度を更新する
            this.velocity.y += gravity
        // それ以外の場合はy軸方向の速度を0にする
        else this.velocity.y = 0

        // 4⃣playerの移動の実装
        // playerの位置を更新する
        this.position.x += this.velocity.x

        // keysオブジェクトのpressedプロパティがtrueの場合は、playerの位置を更新する
        // 5⃣Scrollの実装
        // playerの位置がcanvasの右端よりも小さい場合
        if (keys.right.pressed && player.position.x < 400) {
            // playerの位置を更新する
            player.velocity.x = 5
        // playerの位置がcanvasの左端よりも大きい場合
        } else if (keys.left.pressed && player.position.x > 100) {
            // playerの位置を更新する
            player.velocity.x = -5
        } 
        // ボタンが押されていない場合はplayerの速度を0にする
        else {
            player.velocity.x = 0

            // platformの位置を更新する
            if (keys.right.pressed) {
                platforms.forEach(platform => {
                    // platformの位置を更新する
                    platform.position.x -= 5
                })
            } else if (keys.left.pressed) {
                platforms.forEach(platform => {
                    // platformの位置を更新する
                    platform.position.x += 5
                })
            }
        }
        
        platforms.forEach(platform => {
            // playerの底部がplatformの上部よりも上にあるかの判定
            if (player.position.y + player.height <= platform.position.y &&
                // playerの底部が次のフレームでplatformの上部に達するかの判定
                player.position.y + player.height + player.velocity.y >= platform.position.y &&
                // playerの右側がplatformの左側よりも右にあるかの判定
                player.position.x + player.width >= platform.position.x &&
                // playerの左側がplatformの右側よりも左にあるかの判定
                player.position.x <= platform.position.x + platform.width) {
                    player.velocity.y = 0
            }
        })
    }
 }