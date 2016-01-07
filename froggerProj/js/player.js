/*  Payer, character who needs to avoid enemies
 Parameter: x represents the x coordinate
 Parameter: y represents the y coordinate */
var Player = function(x,y) {
    //(x,y) coordinates of the starting position of a player
    this.x = x;
    this.y = y;
    this.startY = y; // the first ever Y defined when the player is intantiated
    // The image/sprite for our players,
    this.sprite = 'froggerProj/images/char-boy.png';
};

/* Update the Player's position, required method for game
 It takes the enemy list as a param as the player needs to be aware of the enemies positions
 before it can decide to go move */
Player.prototype.update = function(allEnemies) {

    console.log("Player.prototype.update -> userType: " + userType);

    var hasCollided = false;

    //The user controls the selected path for the player
    if (userType !== "Auto") {
        if (counter === 0) {
            //reset the player to its start point
            this.MoveBackToStartLine();
            counter++;
        }

        //Establish whether there is collision just before the player moves
        hasCollided = this.hasCollided(allEnemies);

        if (hasCollided) {
            //Move the player back somewhere on the start line...
            this.MoveBackToStartLine();
            setLostResultStatus();
            console.log("Player.prototype.update -> hasCollided...");
        }
    }
    else {

        //Establish whether there is collision just before the player moves
        hasCollided = this.hasCollided(allEnemies);

        if (hasCollided) {
            //Move the player back somewhere on the start line...
            this.MoveBackToStartLine();
            setLostResultStatus();

            console.log("Player.prototype.update -> hasCollided just after start.");
        }
        else {
            console.log("Player.prototype.update -> no collision, then let's move (if we can...).");

            //Temp variables represent the proposed x and y position of the player following a move.
            var tempX = this.x;
            var tempY = this.y;

            //Automated player move - the logic is very simple. It is based on a pre-selected path.
            //It has no concept of random behaviour, the same path will be executed each time the app is refreshed
            var proposedCoordinates = this.walkPath();
            tempX = proposedCoordinates[0];
            tempY = proposedCoordinates[1];

            console.log("Player.prototype.update -> userType: " + userType);

            //Establish whether the move would provoke a collision
            var couldCollide = this.couldCollide(tempX, tempY, allEnemies);

            var bufferX = 0;
            if (couldCollide) {
                // In this case, to keep it very simple, I  simply assume that in case of potential collusion
                // the player will move to the right by a few pixel as an escape manoeuvre.
                //There is no possible collision then move...
                bufferX = 0.002;

                console.log("Player.prototype.update -> couldCollide is true, just while moving on the canvas.");
            }

            this.move(tempX + bufferX, tempY);

            //Check whether the move has provoked a collision
            hasCollided = this.hasCollided(allEnemies);
            if (hasCollided) {
                //Move the player back somewhere on the start line...
                this.MoveBackToStartLine();
                setLostResultStatus();

                console.log("Player.prototype.update -> hasCollided is true, start again.");
            }
        }

        console.log("Player.prototype.update -> x:" + this.x);
        console.log("Player.prototype.update -> y:" + this.y);
    }
};

/* The proposed next x and y points for the player on the canvas */
Player.prototype.walkPath = function() {
    var tempX;
    var tempY;

    if (this.y >  300 &&  this.y <= 400) {
        tempX = this.x + 0.001;
        tempY = this.y - 1;
    }
    else if (this.y >290 && this.y <= 300)
    {
        tempX = this.x + 10;
        tempY = this.y - 1;
    }
    else if (this.y >150 && this.y <= 290)
    {
        tempX = this.x + 0.001;
        tempY = this.y - 1;
    }
    else if (this.y >140 && this.y <= 150)
    {
        tempX = this.x - 10;
        tempY = this.y - 1;
    }
    else if (this.y >-10 && this.y <= 140)
    {
        tempX = this.x - 0.001;
        tempY = this.y - 15;
    }

    return [tempX, tempY];
};

/* Establish whether the player has collided into the enemies
 bufferXY = 60 is a buffer around the X and Y enemies' coordinate */
Player.prototype.hasCollided = function(allEnemies) {

    return this.checkCollision(this.x, this.y, allEnemies, 50);
};

/* Check whether the player could collide in the enemies
 bufferXY = 55 is a buffer around the X and Y enemies' coordinates. It is deliberately
 larger than the 'hasCollided' buffer to let a chance for the program to pick potential
 enemies' impact before they occur. This is a security distance in effect */
Player.prototype.couldCollide = function(x, y, allEnemies) {

    //bufferXY =100 (greater than bufferXY = 60 is a buffer around the X and Y enemies' coordinates
    return this.checkCollision(x, y,  allEnemies,55 );
};

/* Check for a collision based on a buffer from the X  coordinates.
 Return true for a collision and false if there is none */
Player.prototype.checkCollision = function(x, y,allEnemies, bufferX) {
    //It appears it is very unlikely for a collision to happen when the coordinates (X,Y)
    //of the any enemies and the one of the player are equal. In order to make hits more probable,
    //a perimeter is defined around the main enemy point. If the user point is placed within this perimeter,
    //then there is collision.

    for (var i =0; i< allEnemies.length; i++)
    {
        var enemy = allEnemies[i];
        //console.warn("Player x: " + x + "y: " + y + " - enemy id: " + i +" x: " + enemy.x + " y: " + enemy.y);

        if ( (x >= enemy.x) && (x <= (enemy.x + bufferX)) // the player is on or front of an enemy (given a buffer offset)
            &&
            (y === enemy.y) // the player and enemy are on the same ordinate
        )
        {
            console.log("Player.prototype.checkCollisions ->  Collision");
            return true;
        }

        console.log("Player.prototype.checkCollisions ->  No collision");
        //return false;
    }
    return false;
};

/* There is a collision, the game restarts with a slightly different player initial X position */
Player.prototype.MoveBackToStartLine = function() {

    var tempX = getRandomArbitrary(0,400);
    var tempY = 340;

    //move the player somewhere on the start line...
    this.move(tempX, tempY);
};

/* Move the player to the new coordinates */
/* Ensure the player stays within the canvas boundaries */
Player.prototype.move = function(x,y) {
    //Store x and y in temp variables
    var tempX = x;
    var tempY = y;

    //boundary checks
    if (x < 0) {
        tempX = 0;
    }

    if (x > 400) {
        tempX = 400;
    }

    if (y < 0) {
        tempY = 340;
        setWonResultStatus();
    }

    if (y > 400) {
        tempY = 340;
    }

    //apply the modified tempX and TempY
    //after boundary check potential modifications
    this.x =tempX;
    this.y =tempY;
};

/* Draw the enemy on the screen, required method for game */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Draw the enemy on the screen, required method for game */
Player.prototype.handleInput = function(obj) {

    console.log("Player.prototype.handleInput -> keyCode:" + obj);
    console.log("Player.prototype.handleInput -> Before (x,y) change:" + "(" + this.x + "," + this.y + ")" );
    //left
    if (obj === 37 )
    {
        this.move(this.x - 100, this.y);
    }
    //up
    else if (obj ===  38 )
    {
        this.move(this.x, this.y - 100);
    }
    //right
    else if (obj === 39 )
    {
        this.move(this.x + 100, this.y);
    }
    //down
    else if(obj === 40)
    {
        this.move(this.x, this.y+100);
    }
    else
    {
        //no move...
    }
    console.log("Player.prototype.handleInput -> After (x,y) change:" + "(" + this.x + "," + this.y + ")" );
};