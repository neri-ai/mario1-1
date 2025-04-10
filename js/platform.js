 // 5⃣platformの実装
 // // platformクラスを定義する
export class Platform {
    // constructorメソッドはクラスのインスタンスを生成するためのメソッド
    constructor({x, y}) {
        // platformの初期位置を設定する
        this.position = {
            x,
            y
        }
        // platformの幅と高さを設定する
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
 }