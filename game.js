import { Mario } from "./Player/mario.js";
import { drawGround } from "./Blocks/drawGround.js";
import { inputKey } from "./input/inputKey.js";
import { normalBlock } from "./Blocks/normalBlock.js";
import { collisionDetection } from "./Blocks/normalBlock.js";

// canvasの取得
const canvas = document.querySelector("canvas");

// canvasの2Dコンテキストを取得
const c = canvas.getContext("2d");

// canvasの幅と高さを設定
canvas.width = 1920;
canvas.height = 1080;

// marioの初期値
const mario = new Mario(150, 100, 60, 60);

// 入力値の取得
const input = inputKey();

// ブロックのインスタンスを格納する変数
let normalBlocks = [];

// ゲームロジックの実装
function init() {
        // normalBlockのインスタンスを生成
        normalBlocks = [
                new normalBlock(840, 720, 60, 60),
        ];
}

// ゲームのメインループ
function gameLoop() {
        // アニメーションによるループ
        requestAnimationFrame(gameLoop);

        // 毎フレーム画面を空白に
        c.clearRect(0, 0, 1920, 1080);
        
        mario.update(c, input);
        mario.draw(c);
        normalBlocks.forEach((block) => {
                block.draw(c);
                block.update(c);
        });

        drawGround(c, canvas);

        collisionDetection(mario, normalBlocks);
}

// ゲームの開始
init();
gameLoop();
