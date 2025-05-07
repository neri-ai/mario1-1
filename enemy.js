//
<<<<<<< HEAD
//
//
=======
// enemyクラス
// 
>>>>>>> 923c060695fd6ae4e9dc4abf6d6b69bc4bd1d33d

class Enemy {
    constructor(sp,x,y,vx,vy) {
        this.sp = sp;
        this.x = x<<8;
        this.y = y<<8;
        this.ay = 0;
        this.w = 16;
        this.h = 16;
        this.vx = vx;
        this.vy = vy;
        this.sx = 0;

        this.kill = false;
        this.count = 0;
    }
<<<<<<< HEAD
=======

>>>>>>> 923c060695fd6ae4e9dc4abf6d6b69bc4bd1d33d
    update() {
        if(this.vy<64)this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;

        if((this.y>>4) > FIELD_SIZE_H*16)this.kill = true;
<<<<<<< HEAD
    }

    draw() {
        let an = this.sp
        let sx = (an&15)<<4;
        let sy = (an>>4)<<4;
        let px = (this.x>>4) - (field.scx);
        let py = (this.y>>4) - (field.scy);
        let s;
        if (this.sz)s=this.sz;
        else s=16;
        vcon.drawImage(chImg,sx,sy,16,s, px,py,16,s);
    }
}
=======
}

    draw() {
            let an = this.sp
            let sx = (an&15)<<4;
            let sy = (an>>4)<<4;
            let px = (this.x>>4) - (field.scx);
            let py = (this.y>>4) - (field.scy);
            let s;
            if (this.sz)s=this.sz;
            else s=16;
            vcon.drawImage(chImg,sx,sy,16,s, px,py,16,s);
    }
}
>>>>>>> 923c060695fd6ae4e9dc4abf6d6b69bc4bd1d33d
