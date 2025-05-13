//
// マリオクラス
//

import InputKey from './input.js';

const inputKey = new InputKey();

// アニメーションの定数定義
const ANIME_STAND = 1;
const ANIME_WALK  = 2;
const ANIME_BRAKE = 4;
const ANIME_JUMP  = 8;
const GRAVITY     = 4;
const MAX_SPEED   = 32;

const TYPE_MINI = 0;
const TYPE_BIG = 1;
const TYPE_FIRE = 2;

class Mario {
    constructor(x, y, image, context) {
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
    }

    // 移動処理
    updateWalkSub(dir) {
        // 最高速度まで加速
        if(dir == 0 && this.vx < MAX_SPEED) {
            this.vx++;
        }
        if (dir == 1 && this.vx > -MAX_SPEED) {
            this.vx--;
        }
    }

    // 歩く処理
    updateWalk() {
        // 横移動
        if (inputKey.Left === true) {
            this.updateWalkSub(1);
        } else if (inputKey.Right === true) {
            this.updateWalkSub(0);
        } else {
            if (!this.jump) {
                if (this.vx > 0) {
                    this.vx -= 1;
                }
                if (this.vx < 0) {
                    this.vx += 1;
                }
                if (!this.vx) {
                    this.anim = ANIME_STAND;
                }
            }
        }
    }

    // フレームごとの更新処理
    update() {
        this.updateWalk();

        // 座標の変更
        this.x += this.vx;
        this.y += this.vy;
    }

    // 描画処理
    draw() {
        this.con.drawImage(this.image, 0, 0, this.width, this.height*2, this.x, this.y, this.width*3, this.height*6);
    }
}

export default Mario;