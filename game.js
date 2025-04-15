import { Mario } from "./mario.js";

// canvasの取得
const canvas = document.querySelector("canvas");

// canvasの2Dコンテキストを取得
const c = canvas.getContext("2d");

// canvasの幅と高さを設定
canvas.width = 1920;
canvas.height = 1080;

// marioの初期値
const mario = new Mario(150, 100, 60, 60);

// ゲームロジックの実装
function init() {
        
}

// ゲームのメインループ
function gameLoop() {
        // アニメーションによるループ
        requestAnimationFrame(gameLoop);

        // 毎フレーム画面を空白に
        c.clearRect(0, 0, 1920, 1080);
        
        mario.update();
        mario.draw(c);
}

// ゲームの開始
init();
gameLoop();