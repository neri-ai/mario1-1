// 
//  キノコとかアイテムのクラス
// 

class Item extends Sprite
{       
        // 床の判定
	checkFloor() {
		if(this.vy <=0)return;
		let lx = (this.x>>4);
		let ly = ((this.y+this.vy)>>4);

		if ( field.isBlock(lx+1, ly+15) ||
		     field.isBlock(lx+15, ly+15)) {
			// 床にぶつかった時の処理
			
			this.vy   = 0;
			this.y    = ((((ly+15)>>4)<<4)-16)<<4;
		}
	}

        // 横の壁の判定
	checkWall() {
		let lx = ((this.x+this.vx)>>4);
		let ly = ((this.y+this.vy)>>4);

		if ( field.isBlock(lx+15, ly+3) ||
		     field.isBlock(lx+15, ly+12) ||
                     field.isBlock(lx, ly+3) ||
		     field.isBlock(lx, ly+12)) {
			this.vx *= -1;
                     }
	}

       update() {
                if(this.kill)return;
                if(ojisan.kinoko)return;

                if( this.checkHit(ojisan)) {
                        ojisan.kinoko = 1;
                        this.kill = true;
                        return
                }

                if(++this.count <= 32) {
                        this.sz = (1+this.count)>>1;
                        this.y -= 1<<3;
                        if(this.count==32)this.vx = 24;
                        return;
                }

                this.checkFloor();
                this.checkWall();
                super.update();
       }
}