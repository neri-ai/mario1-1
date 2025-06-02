import Mario from './mario.js'
import InputKey from './input.js';

// canvasの取得(DOMから取得)
let can = document.getElementById("can");
let con = can.getContext("2d");

// canvasの幅と高さを設定
const SCREEN_WIDTH = 256 * 3;
const SCREEN_HEIGHT = 224 * 3;
can.width = SCREEN_WIDTH;
can.height = SCREEN_HEIGHT;

// 実画面の画像をぼやけさせない設定
con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;

// 入力キーの生成
const inputKey = new InputKey();

// フレームカウント
let frameCount = 0;
let lastTime = performance.now();  // 前回のフレームのタイムスタンプ
let fps = 60;

// スプライト画像の読み込み
let chImg = new Image();
chImg.src = "sprite.png";

// マリオの生成
let mario = new Mario(100, 100, chImg, con, inputKey);

function update() {
    mario.update();
    draw(); 
}

function draw() {
    // canvasの背景を指定
    con.fillStyle = "#66AAFF";
    con.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    frameCount++;

    // デバック情報表示
    con.font = "24px 'Impact'";
    con.fillStyle = "White";
    con.fillText("FRAME:" + frameCount, 40, 40);
    con.fillText("FPS:" + fps, 40, 80);

    mario.draw();
}

function animate() {
    const currentTime = performance.now();  // 現在のフレームのタイムスタンプ
    const deltaTime = currentTime - lastTime;  // 前回のフレームからの経過時間

    // FPSを計算
    // fps = 1000 / deltaTime;  // FPS = 1000ms / deltaTime(ms)

    // 60FPSに制限
    if (deltaTime >= 1000 / fps) {
        lastTime = currentTime - (deltaTime % (1000 / fps));  // 前回のフレームのタイムスタンプを更新

        update();
    }

    requestAnimationFrame(animate);
}
window.onload = function() {
    animate();
}


