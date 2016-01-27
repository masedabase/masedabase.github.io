var spawnIndex;
var maxIndex;
var snowflakeArray = [];
var ctx;
function startSnowflakes() {
	spawnIndex = 0;
	maxIndex = 500;
	for (var i = 0; i < maxIndex; i++) {
		snowflakeArray[i] = new snowflake(0, 0, "white", 0, 0);
	}
	setInterval(updateMovement, 30);
	setInterval(spawnNewSnowflake, 100);
}
function snowflake(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	ctx = document.getCSSCanvasContext("2d", "squares", window.innerWidth, window.innerHeight);
	this.update = function() {
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.beginPath();
		//diagonal down line
		ctx.moveTo(this.x + this.width/6, this.y + this.height/6);
		ctx.lineTo(this.x + 5*this.width/6, this.y + 5*this.height/6);
		//vertical line
		ctx.moveTo(this.x + this.width/2, this.y);
		ctx.lineTo(this.x + this.width/2, this.y + this.height);
		//horizontal line
		ctx.moveTo(this.x, this.y + this.height/2);					
		ctx.lineTo(this.x + this.width, this.y + this.height/2);
		//diagonal up line
		ctx.moveTo(this.x + 5*this.width/6, this.y + this.height/6);
		ctx.lineTo(this.x + this.width/6, this.y + 5*this.height/6);
		ctx.stroke();
	}
	this.move = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
}
function smiley(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 2;
	this.x = x;
	this.y = y;
	ctx = document.getCSSCanvasContext("2d", "squares", window.innerWidth, window.innerHeight);
	this.update = function() {
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(this.x,this.y,50,0,Math.PI*2,true); // Outer circle
		ctx.moveTo(this.x + 35,this.y);
		ctx.arc(this.x,this.y,35,0,Math.PI,false);  // Mouth (clockwise)
		ctx.moveTo(this.x-10,this.y-10);
		ctx.arc(this.x-15,this.y-10,5,0,Math.PI*2,true);  // Left eye
		ctx.moveTo(this.x+20,this.y-10);
		ctx.arc(this.x+15,this.y-10,5,0,Math.PI*2,true);  // Right eye
		ctx.stroke();
	}
	this.move = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
}
function updateMovement() {
	clearWindow();
	for (var i = 0; i < maxIndex; i++) {
		snowflakeArray[i].move();
		snowflakeArray[i].update();
	}
}
function clearWindow() {
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}
function spawnNewSnowflake() {
	var randomNum = Math.random();
	snowflakeArray[spawnIndex] = new snowflake(randomNum*20+20, randomNum*20+20, "white", Math.random()*window.innerWidth, -30);
	snowflakeArray[spawnIndex].speedY = randomNum*3+2;
	spawnIndex++;
	if (spawnIndex >= maxIndex){
		spawnIndex = 0;
	}
}