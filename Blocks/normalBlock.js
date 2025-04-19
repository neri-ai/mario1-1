export class normalBlock {
  constructor(x, y, w, h) {
    this.position = {
        x,
        y,
  };
    this.width = w;
    this.height = h;
  };

  draw(c) {
    c.fillStyle = "blue";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  };

  update(c) {
    this.draw(c);
  };
}

// MarioとnormalBlockの衝突判定
export function collisionDetection(mario, normalBlocks) {
        normalBlocks.forEach(normalBlock => {
                // プレイヤーがプラットフォームの上にいるかの判定
                if (
                        mario.position.y + mario.height <= normalBlock.position.y &&
                        mario.position.y + mario.height + mario.velocity.y >= normalBlock.position.y &&
                        mario.position.x + mario.width >= normalBlock.position.x &&
                        mario.position.x <= normalBlock.position.x + normalBlock.width
                ) {
                        console.log("ue");
                        mario.velocity.y = 0;
                }
                // プレイヤーがプラットフォームの下にいるかの判定
                else if (
                        // プレイヤーの位置が
                        mario.position.y <= normalBlock.position.y + normalBlock.height &&
                        mario.position.y + mario.velocity.y <= normalBlock.position.y + normalBlock.height &&
                        mario.position.x + mario.width >= normalBlock.position.x &&
                        mario.position.x <= normalBlock.position.x + normalBlock.width &&
                        // marioがジャンプしているときのみ
                        mario.velocity.y < 0 &&
                        // プレイヤーの位置がプラットフォームの上にある場合以外
                        !(mario.position.y + mario.height <= normalBlock.position.y)
                ) {
                        console.log("sita");
                        mario.velocity.y = 1;
                }
                // プレイヤーがプラットフォームの左側にいるかの判定
                else if (
                        mario.position.x + mario.width <= normalBlock.position.x &&
                        mario.position.x + mario.width + mario.velocity.x >= normalBlock.position.x &&
                        mario.position.y + mario.height >= normalBlock.position.y &&
                        mario.position.y <= normalBlock.position.y + normalBlock.height
                ) {
                        console.log("hidari");
                        mario.velocity.x = 0;
                }
                // プレイヤーがプラットフォームの右側にいるかの判定
                else if (
                        mario.position.x >= normalBlock.position.x + normalBlock.width &&
                        mario.position.x + mario.velocity.x >= normalBlock.position.x + normalBlock.width &&
                        mario.position.y + mario.height >= normalBlock.position.y &&
                        mario.position.y <= normalBlock.position.y + normalBlock.height
                ) {
                        console.log("migi");
                        mario.velocity.x = 0;
                }
        });
}