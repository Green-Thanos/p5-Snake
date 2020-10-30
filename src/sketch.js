var s;
var pix = 15;
var food1,food2,specfood;
var randomfood;
var Hscore = 0;
var scorenum=0;
let audio, yeet;
let speed = 1, negspeed = -1;

function preload() {
  audio = new Audio('Music/beats.mp3');
  // yeet = new Audio('Music/sped.mp3')
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    s = new snake();
    frameRate(25);
    picklocation();
}
function eat(){
  if (dist(food1.x, food1.y, s.x, s.y) < 1){
    s.total ++;
    scorenum ++;
    return true;
  }
  else if (dist(food2.x, food2.y, s.x, s.y) < 1 && (randomfood > 2)){
      s.total ++;
      scorenum ++;
      return true;
  }
  else if (dist(specfood.x, specfood.y, s.x, s.y) < 1 && randomfood == 5 ){
      s.total ++;
      scorenum += 5;
      return true;
  }
  else false
}
function dead(){
  if (s.x > windowWidth || s.y > windowHeight || s.x < 0 || s.y < 0){
    Hscore = max(Hscore, scorenum);
    s = new snake();
    scorenum = 0;
    picklocation();
    if (hardMusic) {
      yeet.stop();
      hardMusic = false;
    }
    hardLevelStart = false;
  }
  else {
    for (var i = 0; i < s.tail.length; i ++){
      if (dist(s.x, s.y, s.tail[i].x, s.tail[i].y) < 1){
        Hscore = max(Hscore, scorenum);
        s = new snake();
        scorenum = 0;
        picklocation();
      }
    }
  }
}
function picklocation(){
  var row = floor(windowWidth / pix)-10;
  var col = floor(windowHeight / pix)-10;
  randomfood= floor(random(6));
  food1 = createVector(floor(random(row)),floor(random(col)));
  food1.mult(pix);
  food2 = createVector(floor(random(row)),floor(random(col)));
  food2.mult(pix);
  specfood = createVector(floor(random(row)),floor(random(col)));
  specfood.mult(pix);
}
function showfood(){
    fill(255,0,100);
    rect(food1.x,food1.y,pix,pix);
    if(randomfood > 2){
      fill(255,0,100);
      rect(food2.x, food2.y, pix, pix);
    }
    if (randomfood == 5){
      fill(255, 252, 0);
      rect(specfood.x, specfood.y, pix, pix);
  }
}
var gamename = '';
function copyright(){
  var gamename = 'Snake Game';
  textSize(100);
  fill(255, 255, 255, 20);
  nameWidht = textWidth(gamename);
  text(gamename, (width - nameWidht)/2, height/2 - 40);
  var name = 'By Johnny';
  textSize(20);
  fill(255, 255, 255, 30);
  nameWidht = textWidth(name);
  text(name, (width - nameWidht)/2, height/2 - 5,);
}
function score(){
  var score = 'Score - ' + scorenum;
  textSize(20);
  fill(255, 255, 255);
  textAlign(LEFT);
  nameWidht = textWidth(score);
  text(score, 10, 30);
  var Highscore = 'Highscore - ' + Hscore;
  textSize(20);
  textAlign(LEFT);
  nameWidht = textWidth(score);
  text(Highscore, 10, 60);

}
function hardLevel() {
  background(51);
  if (eat()) picklocation();
  s.update();
  s.show();
  score();
  showfood()
  dead();
  speed = 3;
  negspeed = -3;
}
let musicStarted = false, hardLevelStart = false, hardMusic = false;
function gameStart() {
  background(51);
  if (eat()) picklocation();
  s.update();
  s.show();
  score();
  copyright();
  showfood()
  dead();
}
/*function mouseClicked() {
  if (scorenum >= 30) return;
  else if (musicStarted === false) {
    console.log('PLaying')
    musicStarted = true;
    audio.play();
  } else {
    musicStarted = false;
    audio.pause();
    console.log('Loop Toggled')
  }
}*/
function draw() {
  if (scorenum >= 30) {
    hardLevelStart = true;
    hardLevel();
    textSize(100);
    fill(255, 255, 255, 20);
    nameWidht = textWidth('Yeet');
    text('Yeet', (width - nameWidht)/2, height/2);
  }
  else if (musicStarted === true) {
    hardLevelStart = false;
    gameStart();
  } else {
    hardLevelStart = false;
    background(51);
    fill(237, 245, 225)
    textSize(200)
    text('Snake', windowWidth/2 - 250, windowHeight/2);
    textSize(30)
    text('  Use the Arrow Keys to Move\nPress Space to Start or Pause', windowWidth/2 - 200, windowHeight/2 + 100)
  }
  if (scorenum >= 30 && !hardMusic) {
    hardMusic = true;
    // yeet.play();
  }
}
function keyPressed(){
  if (keyCode == UP_ARROW){
      if (s.yspeed != speed)
      s.dir(0, negspeed);
    }
  if (keyCode == DOWN_ARROW){
    if (s.yspeed != negspeed)
    s.dir(0, speed);
  }
  if (keyCode == RIGHT_ARROW){
    if (s.xspeed != negspeed)
    s.dir(speed, 0);
  }
  if (keyCode == LEFT_ARROW){
    if (s.xspeed != speed)
    s.dir(negspeed, 0);
  }
  // Spacebar Stuff
  if (keyCode == 32) {
    if (scorenum >= 30) return audio.pause();
  else if (musicStarted === false) {
    console.log('Play Toggled')
    musicStarted = true;
    audio.play();
  } else {
    musicStarted = false;
    audio.pause();
    console.log('Pause Toggled')
  }
  }
}
