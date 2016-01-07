// Enemies instantiation
var enemy1 = new Enemy(100,40);
enemy1.speedType = "slow";
var enemy2 = new Enemy(150,140);
enemy2.speedType = "slow";
var enemy3 = new Enemy(200,240);
enemy3.speedType = "slow";
var enemy4 = new Enemy(50,40);
enemy4.speedType = "fast";
var enemy5 = new Enemy(50,140);
enemy5.speedType = "medium";

/*Place all enemy objects in an array called allEnemies*/
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);

/* Instantiate and place the player object in a variable called player
 with a fix Y coordinates and a randomised X point within a predefined range*/
var xRdm =  getRandomArbitrary(0,400);
var player = new Player(xRdm,340);

/*  This listens for key presses and sends the keys to your */
document.addEventListener('keyup', function(e) {

    if (userType !== "Auto") {
        console.log("document.addEventListener -> keyCode:" + e.keyCode);

        player.handleInput(e.keyCode);
    }
    else
    {
        //Performance improvement, only record key stoke when the game is player by a real user
        console.log("document.addEventListener  -> userType is Auto, hence keys not recorded");
    }
});
