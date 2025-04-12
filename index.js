// 1⃣canvasの実装
// canvasを取得する
const canvas = document.querySelector("canvas");

// canvasの2Dコンテキストを取得する
// 2Dコンテキストはcanvasに描画するためのAPIを提供している
const c = canvas.getContext("2d");


// canvasの幅と高さを設定する
canvas.width = 1920;
canvas.height = 1080;

// 3⃣重力の実装
// 重力の定数定義
const gravity = 0.3;

// 2⃣playerの実装
// playerクラスを定義する
class Player {
  // constructorメソッドはクラスのインスタンスを生成するためのメソッド
  // インスタンスを生成する際に呼び出される
  constructor() {
    // thisキーワードはクラスのインスタンスを指す
    // playerの初期位置を設定する
    this.position = {
      x: 150,
      y: 100,
    };

    // playerの初期速度を設定する
    // y軸方向に+1の速度を持つ
    // heightはページの底が最も値が大きくなる
    this.velocity = {
      x: 0,
      y: 1,
    };

    // playerの幅と高さを設定する
    this.width = 60;
    this.height = 60;
  }

  // drawメソッドはplayerを描画するためのメソッド
  draw() {
    // fillStyleは塗りつぶしの色を設定する
    c.fillStyle = "red";

    // fillRectは矩形を描画するメソッド
    // 処理時の位置を指定し、インスタンスの幅と高さで描画する
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  // updateメソッドはplayerの位置を更新するためのメソッド
  update() {
    // playerの位置を更新して描画する
    this.draw();

    // playerの位置を更新する
    // 落下速度がある時はy軸方向にpositionを更新する
    this.position.y += this.velocity.y;

    // playerの位置がcanvasの底に達したら、y軸方向の速度を0にする
    // plyerの位置+playerの高さ+playerの速度がページの高さより小さい場合
    // 地面分の高さを引く
    if (this.position.y + this.height + this.velocity.y <= canvas.height - 120)
      // 重力を加算してy軸方向に速度を更新する
      this.velocity.y += gravity;
    // それ以外の場合はy軸方向の速度を0にする
    else this.velocity.y = 0;

    // 4⃣playerの移動の実装
    // playerの位置を更新する
    this.position.x += this.velocity.x;

    // keysオブジェクトのpressedプロパティがtrueの場合は、playerの位置を更新する
    // 5⃣Scrollの実装
    // playerの位置がcanvasの右端よりも小さい場合
    if (keys.right.pressed && player.position.x < 400) {
      // playerの位置を更新する
      player.velocity.x = 5;

      // playerの位置がcanvasの左端よりも大きい場合
    } else if (keys.left.pressed && player.position.x > 100) {
      // playerの位置を更新する
      player.velocity.x = -5;
    }

    // ボタンが押されていない場合はplayerの速度を0にする
    else {
      player.velocity.x = 0;

      // platformの位置を更新する
      if (keys.right.pressed) {
        platforms.forEach((platform) => {
          // platformの位置を更新する
          platform.position.x -= 5;
        });
      } else if (keys.left.pressed) {
        platforms.forEach((platform) => {
          // platformの位置を更新する
          platform.position.x += 5;
        });
      }
    }

    platforms.forEach((platform) => {
      // playerの底部がplatformの上部よりも上にあるかの判定
      if (
        player.position.y + player.height <= platform.position.y &&
        // playerの底部が次のフレームでplatformの上部に達するかの判定

        player.position.y + player.height + player.velocity.y >=
          platform.position.y &&
        // playerの右側がplatformの左側よりも右にあるかの判定

        player.position.x + player.width >= platform.position.x &&
        // playerの左側がplatformの右側よりも左にあるかの判定

        player.position.x <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0;
      } else if (
        player.position.x + player.width <= platform.position.x &&
        player.position.x + player.width + player.velocity.x >=
          platform.position.x &&
        player.position.y + player.height >= platform.position.y &&
        player.position.y <= platform.position.y + platform.height
      ) {
        player.velocity.x = 0;
      }
    });

    // 敵との衝突
    enemies.forEach((enemy, index) => {
      if (
        player.position.y + player.height <= enemy.position.y &&
        player.position.y + player.height + player.velocity.y >=
          enemy.position.y &&
        player.position.x + player.width >= enemy.position.x &&
        player.position.x <= enemy.position.x + enemy.width
      ) {
        enemies.splice(index, 1);
      }
    });
  }
}

// 6⃣enemyクラスの実装
// enemyクラスを定義する
class Enemy {
  constructor(x, y) {
    this.position = {
      x,
      y,
    };

    this.velocity = {
      x: 0,
      y: 1,
    };

    this.width = 60;
    this.height = 60;
  }

  draw() {
    c.fillStyle = "black";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x -= 2;
  }
}

// 5⃣platformの実装
// platformクラスを定義する
class Platform {
  // constructorメソッドはクラスのインスタンスを生成するためのメソッド

  constructor({ x, y, w, h }) {
    // platformの初期位置を設定する

    this.position = {
      x,
      y,
    };

    // platformの幅と高さを設定する
    this.width = w;
    this.height = h;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// playerクラスのインスタンスを生成する
const player = new Player();

// platformクラスのインスタンスを生成する
// const platform = new Platform()
// 6⃣複数のplatformの実装
const platforms = [
  // コインブロック
  new Platform({ x: 600, y: 720, w: 60, h: 60 }),
  // 通常ブロック
  new Platform({ x: 840, y: 720, w: 60, h: 60 }),
  // キノコブロック
  new Platform({ x: 900, y: 720, w: 60, h: 60 }),
  // 通常ブロック
  new Platform({ x: 960, y: 720, w: 60, h: 60 }),
  // コインブロック
  new Platform({ x: 1020, y: 720, w: 60, h: 60 }),
  // 通常ブロック
  new Platform({ x: 1080, y: 720, w: 60, h: 60 }),
  // コインブロック
  new Platform({ x: 960, y: 480, w: 60, h: 60 }),
];

// enemyクラスのインスタンスを生成する
const enemies = [
  new Enemy(800, 900),
  new Enemy(1000, 900),
  new Enemy(1200, 900),
];

// オブジェクトリテラルを使用してkeyの状態を管理する
// 初期値はfalseを設定する
const keys = {
  right: {
    pressed: false,
  },

  left: {
    pressed: false,
  },
};

// animate関数はアニメーションを実行するための関数
function animate() {
  // 大体60fpsのアニメーション処理を行う
  // 自身でanimate関数を呼び出し、ループしてアニメーションを実現する
  requestAnimationFrame(animate);

  // clearRectでcanvasの原点(0, 0)から幅と高さを指定して削除する
  // この処理で一つ前のフレームを消すことができる
  c.clearRect(0, 0, canvas.width, canvas.height);

  // その後updateメソッドを呼び出して、playerの位置を更新する
  player.update();

  // enemyのdrawメソッドを呼び出して、enemyを描画する
  enemies.forEach((enemy) => {
    enemy.update();
  }); 

  // platformのdrawメソッドを呼び出して、platformを描画する
  platforms.forEach((platform) => {
    platform.draw();
  });

  // drawGround関数を呼び出して、地面を描画する
  drawGround();
  // platformのdrawメソッドを呼び出して、platformを描画する
  // platform.draw()
}

// animate関数を呼び出してアニメーションを開始する
animate();

// 下記のように書くと押下されたキーのkeyCodeを取得することができる
// window.addEventListener("keydown", (event) => {
//    console.log(event)
// })

// addEventListenerはイベントを監視するためのメソッド
// windowのkeydownイベントをトリガーにして、処理の実行を行う
// アロー関数を使用して、eventオブジェクトに引数を渡す。アロー関数とは、関数を簡潔に書くための構文
window.addEventListener("keydown", (event) => {
  // console.log(keyCode)
  // switch分は条件分岐を行うための構文
  switch (event.key) {
    // aキーが押された場合
    case "a":
      console.log("left");
      // keysオブジェクトのleftプロパティのpressedプロパティをtrueにする
      keys.left.pressed = true;
      // breakeを使用しないと、次のcaseも実行される。
      break;

    // dキーが押された場合
    case "d":
      console.log("right");
      // keysオブジェクトのrightプロパティのpressedプロパティをtrueにする
      keys.right.pressed = true;
      break;

    // wキーが押された場合
    case "w":
      console.log("up");
      player.velocity.y -= 15;
      break;

    // sキーが押された場合
    case "s":
      console.log("down");
      break;
  }
});

// 指定のキーが話された場合の処理
window.addEventListener("keyup", (event) => {
  // console.log(keyCode)
  // switch分は条件分岐を行うための構文
  switch (event.key) {
    // aキーが離れた場合
    case "a":
      console.log("left");
      keys.left.pressed = false;
      // brakeを使用しないと、次のcaseも実行される。
      break;

    // dキーが離れた場合
    case "d":
      console.log("right");
      keys.right.pressed = false;
      // player.velocity.x = 0
      break;

    // wキーが離れた場合
    case "w":
      console.log("up");
      keys.up.pressed = false;
      break;

    // sキーが離れた場合
    case "s":
      console.log("down");
      break;
  }
});

// 地面を描画する関数
function drawGround() {
  c.fillStyle = "green";
  c.fillRect(0, canvas.height - 120, canvas.width, 120);
}