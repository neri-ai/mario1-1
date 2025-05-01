// const GAME_FPS = 1000/60;	//FPS
// const SCREEN_SIZE_W = 256;
// const SCREEN_SIZE_H = 224;

// 加増画面を作成
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

// 実際の画面を取得
let can = document.getElementById("can");
let con = can.getContext("2d");

// 仮想画面と実画面のサイズを設定
vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

can.width  = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

//　実画面の画像をぼやけさせない設定 
con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;


//フレームカウントと開始時間を初期化
let frameCount = 0;
let startTime;

// スプライト画像の読み込み
let chImg = new Image();
chImg.src = "sprite.png";
//chImg.onload = draw;

//キーボードの状態を管理するオブジェクト
let keyb={};

//おじさんを作る
let ojisan = new Ojisan(100,100);

// フィールドを作る
let field = new Field();

// ブロックのオブジェクト
let block = [];

// アイテムのリストを作る
let item = [];

let enemies = [new Enemy(96, 20, 192, -16, 0)];	

// オブジェクトを更新する関数
function updateObj(obj) {
	// 配列を逆順で処理
	for (let i = obj.length-1; i >= 0; i--) {
		// 各オブジェクトの状態を更新
		obj[i].update();
		// 削除フラグが立っているオブジェクトを配列から削除
		if(obj[i].kill)obj.splice(i, 1);
	}
}

//更新処理
function update()
{
	// フィールドの状態を更新
	field.update();

	// ブロックの状態を更新
	updateObj(block);

	// アイテムの状態を更新
	updateObj(item);

	// 敵の状態を更新
	updateObj(enemies);

	// おじさんの状態を更新
	ojisan.update();
}

//スプライトの描画
function drawSprite(snum,x,y)
{
	// スプライトのx座標を計算
	let sx = (snum&15)<<4;
	// スプライトのy座標を計算
	let sy = (snum>>4)<<4;
	
	// 仮想画面にスプライトを描画
	vcon.drawImage(chImg,sx,sy,16,32, x,y,16,32);
}

// オブジェクトを描画する関数
function drawObj(obj) {
	// 配列内全てのオブジェクトを描画
	for (let i = 0; i < obj.length; i++) {
		obj[i].draw();
	}
}

//描画処理
function draw()
{
	//画面を水色でクリア
	vcon.fillStyle="#66AAFF";
	// 仮想画面を塗りつぶす
	vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);

	//フィールドを描画
	field.draw();

	// ブロックとアイテムを描画
	drawObj(block);
	drawObj(item);
	drawObj(enemies);

	//おじさんを表示
	ojisan.draw();
	
	//デバッグ情報を表示
	vcon.font="24px 'Impact'";
	vcon.fillStyle="white";
	vcon.fillText("FRAME:"+frameCount,10,20);
	
	
	//仮想画面から実画面へ拡大転送
	con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
		0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);
}


//setInterval(mainLoop,1000/60);

//ループ開始
window.onload = function()
{
	// ゲーム開始の時間を記録
	startTime = performance.now();
	// メインループを開始
	mainLoop();
}

//メインループ
function mainLoop()
{
	// 現在の時間を取得
	let nowTime  = performance.now();
	// フレームカウントを計算
	let nowFrame = (nowTime-startTime) / GAME_FPS;

	// フレームが進んでいる場合
	if( nowFrame > frameCount )
	{
		let c=0;
		// 必要な回数だけ更新処理を実行
		while( nowFrame > frameCount )
		{
			frameCount++;
			//更新処理
			update();
			// 最大4回まで更新
			if( ++c>=4 )break;
		}
		//描画処理
		draw();
	}
	// 毎フレームの処理を実行
	requestAnimationFrame(mainLoop);
}



//キーボードが押された時に呼ばれる
document.onkeydown = function(e)
{
	if(e.key == "a")keyb.Left  = true;
	if(e.key == "d")keyb.Right = true;
	if(e.key == "s")keyb.BBUTTON = true;
	if(e.key == "w")keyb.ABUTTON = true;

	// if(e.keyCode == 65) {
	// 	block.push(new Block(368,5,5));
	// }

	// if(e.keyCode == 65) field.scx--;
	
	// if(e.keyCode == 83) field.scx++;
}

//キーボードが離された時に呼ばれる
document.onkeyup = function(e)
{
	if(e.key == "a")keyb.Left  = false;
	if(e.key == "d")keyb.Right = false;
	if(e.key == "s")keyb.BBUTTON = false;
	if(e.key == "w")keyb.ABUTTON = false;
}