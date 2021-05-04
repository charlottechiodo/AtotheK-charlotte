var font1, words;
var myText='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
function preload(){
font1= loadFont('data/theboldfont.ttf');

}

function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
textFont(font1);
words=myText.split(' ');
textSize(32);
textLeading(32*1.5);
fill(255);
}


function draw() {
  background(0);
//text(myText, width/20, height/20,600,600);
for (var i=0; i<words.length;i++){ //how to get more than one word on a line, i is a throwaway variable as we count upwards of 1, can be any letter, it acts as a counter
  text(words[i],10, i*32);


}
}
