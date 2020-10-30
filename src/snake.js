function snake(){
    var row = floor(windowWidth / pix);
    var col = floor(windowHeight / pix);
    this.total = 0;
    this.tail = [];
    this.x = floor(random(20,row-20))*pix;
    this.y = floor(random(15,col-15))*pix;
    var temp = floor(random(0,4));
    this.xspeed;
    this.yspeed;
    if (temp == 1){
      this.xspeed = 1;
      this.yspeed = 0;
    }
    else if (temp == 2){
      this.xspeed = 0;
      this.yspeed = 1;
    }
    else if (temp == 3){
      this.xspeed = -1;
      this.yspeed = 0;
    }
    else {
      this.xspeed = 0;
      this.yspeed = -1;
    }
    this.update = function(){
      for(var i = 0;i < this.tail.length-1; i ++){
        this.tail[i] = this.tail[i + 1];
      }
      this.tail[this.total] = createVector(this.x,this.y);
        this.x = this.x + this.xspeed * pix;
        this.y = this.y + this.yspeed * pix;
    }
    this.show = function(){
        fill(255);
          for (var i = 0; i < this.tail.length; i ++){
             rect(this.tail[i].x, this.tail[i].y, pix, pix);}
    }
    this.dir = function(x, y){
        this.xspeed = x;
        this.yspeed = y;
    }
}
