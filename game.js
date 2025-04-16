import { Mario } from "./Player/mario.js";
import { drawGround } from "./Blocks/drawGround.js";
import { inputKey } from "./input/inputKey.js";

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
        
        mario.update(c);
        mario.draw(c);
        drawGround(c, canvas);
}

// ゲームの開始
init();
gameLoop();
inputKey();
