//
// マリオクラス
//

// アニメーションの定数定義
// const ANIME_STAND = 1;
// const ANIME_WALK  = 2;
// const ANIME_BRAKE = 4;
// const ANIME_JUMP  = 8;
const GRAVITY     = 5;
const MAX_SPEED   = 32;

// const TYPE_MINI = 0;
// const TYPE_BIG = 1;
// const TYPE_FIRE = 2;

class Mario {
    constructor(x, y, image, context, inputKey) {
        this.spNumber = 0;
        this.x = 300;
        this.y = 300;
        this.vx = 0;
        this.vy = 0;
        this.width = 16;
        this.height = 16;
        this.image = image;
        this.con = context;
        this.dir = 0;
        this.inputKey = inputKey;
        this.sx = 0;
        this.sy = 0;
        this.farameCount = 0;
        this.dir = "right";
        this.jumpFlg = 0;
    }

    // 歩く処理
    walk() {
        if (this.inputKey.inputKey.Left === true) {
            if (this.vx > -MAX_SPEED) {
                this.vx--;
            }
            this.dir = "left";
        } else if (this.inputKey.inputKey.Right === true) {
            if (this.vx < MAX_SPEED) {
                this.vx += 1;
            }
            this.dir = "right";
        } else {
            if (this.vx > 0) {
                this.vx -= 1;
            } else if (this.vx < 0) {
                this.vx += 1;
            }
        }
    }

    // ジャンプ処理
    jump() {
        if (this.inputKey.inputKey.Up === true) {
            if (this.jumpFlg === 0) {
                this.vy -= 50;
                this.jumpFlg = 1;
            }
        }
    }

    // 歩くアニメーション
    walkAnimation() {
        if (this.farameCount % 5 === 0) {
            if (this.vx > 0) {
                this.sy = 0;
                // sx を 32 → 48 → 64 → 32 とループ
                if (this.sx < 32) {
                    this.sx = 32; // 初回は32から開始
                } else {
                    this.sx += 16; // 16ずつ増加
                    if (this.sx > 64) {
                        this.sx = 32; // 64を超えたら32に戻す
                    }
                }
            } else if (this.vx < 0) {
                this.sy = 48;
                if (this.sx < 32) {
                    this.sx = 32;
                } else {
                    this.sx += 16;
                    if (this.sx > 64) {
                        this.sx = 32;
                    }
                }
            } else {
                this.sx = 0; // 停止時のアニメーション
                this.sy = this.dir === "left" ? 48 : 0;
            }
        }

        this.farameCount++;
        console.log(this.sx);
    }

    // フレームごとの更新処理
    update() {
        // this.updateWalkSub();
        

        this.walkAnimation();

        if (this.y < 500) {
            this.vy += GRAVITY;
        } else {
            this.y = 500;
            this.vy = 0;
            this.jumpFlg = 0;
        }

        this.walk();
        this.jump()

        // 座標の変更
        this.x += this.vx;
        this.y += this.vy;
        
    }

    // 描画処理
    draw() {
        this.con.drawImage(this.image, this.sx, this.sy, this.width, this.height*2, this.x, this.y, this.width*3, this.height*6);
    }
}

export default Mario;