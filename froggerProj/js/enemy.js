/* Enemies our player must avoid */
var Enemy = function(x, y) {
    //(x,y) coordinates of the starting position of an enemy
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'froggerProj/images/enemy-bug.png';
};

/* Update the enemy's position, required method for game
 Parameter: dt, a time delta between ticks
 Parameter: canvasWidth, the width of the canvas
 Parameter: buffer, distance in px to the enemy (x,y) coordinates */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    console.log("Enemy.prototype.update before dt adjustment and acceleation -> x:" + this.x);
    console.log("Enemy.prototype.update before dt adjustment -> y:" + this.y);
    console.log("Enemy.prototype.update before dt adjustment -> dt:" + dt);

    //A quick hard coded way to provide acceleration rates based on enenmySpeed  tag.
    //This means nothing in reality, just an attempt to simulate different speeds...
    var acceleration = 1;
    if (this.speedType == "medium" )
    {
        acceleration = acceleration * 1.5;
    }
    if (this.speedType == "fast" )
    {
        acceleration = acceleration * 3;
    }

    //The enemies reappear on the screen when they go off the canvas width.
    //I've added a magic number of 300 points, to give a chance to the user to win...
    //else the enemies reappear to quicky and it becomes very hard...
    if (this.x > (ctx.canvas.width + 300))
    {
        this.x = 0;
    }

    this.x= this.x + acceleration;
    this.y= this.y;

    console.log("Enemy.prototype.update -> acceleration:" + acceleration);
    console.log("Enemy.prototype.update after dt adjustment -> x:" + this.x);
    console.log("Enemy.prototype.update after dt adjustment -> y:" + this.y);
};

/* Set the speed type ("medium or fast") for an enemy object*/
Enemy.prototype.speedType = function(speedType) {
    this.speedType = speedType;
};

/*  Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};