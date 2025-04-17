// 重力の定義
const gravity = 0.35;

export class Mario {
        constructor(x, y, w, h) {
                this.width = w
                this.height = h
                this.color = "red";
                this.position = {
                        x: 150,
                        y: 0,
                }
        };
        velocity = {
                x: 0,
                y: 1
        };

        draw(c) {
                c.fillStyle = this.color;
                c.fillRect(this.position.x, this.position.y, this.width, this.height)
        };

        update(c, input){
                this.draw(c);

                // 落下速度がある場合はy軸方向にpositionを更新する
                this.position.y += this.velocity.y;

                // marioの位置がcanvasのそこに達したら、y軸方向の速度を0にする
                // marioの位置+playerの速度がページの高さより小さい場合
                // 地面分の高さを引く
                if (this.position.y + this.height + this.velocity.y <= 1080 - 120) {
                        this.velocity.y += gravity;
                } else {
                        this.velocity.y = 0;
                }

                // marioの位置更新
                if (input === "right") {
                        this.velocity.x = 5;
                }
        };
};