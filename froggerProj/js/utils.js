/* userType is a global value which indicates the user type selection (defaulted to Auto)
 Auto: means the program directs the player automatically (i.e. no human intervention)
 User: anything else refers to a pre-defined user name. In other words, a real user making the player move on the canvas. */
var userType = "Auto";
var counter = 0;

/* Generate a random number with min as a floor */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/* Set the status of the result to won*/
function setWonResultStatus() {
    setResultStatus("!!!WON!!!");
}

/* Set the status of the result to lost*/
function setLostResultStatus() {
    setResultStatus("^^^LOST^^^");
}

/* Set the status of the result to empty*/
function setIntiialResultStatus() {
    setResultStatus("Playing in Progress...");
}

/* Set the status of the resut (won/lost/empty)*/
function setResultStatus(status) {
    if (status === "Playing in Progress...") {
        document.getElementById('result').innerHTML = status;
    }
    else {
        document.getElementById('result').innerHTML = "You have " + status;
    }
}

/*Establish the value of the selected 'mode' combo box.*/
onUserTypeChange = function() {
    var userTypeElem = document.getElementById("userType");
    userType = userTypeElem.options[userTypeElem.selectedIndex].value;
    counter = 0;

    setIntiialResultStatus();

    //lose focus of the selector => now focus is back on the canvas
    userTypeElem.blur();
};

/*The is playing event */
onUserPlayChange = function(){
    console.log("Use the keys ('up,'down',right','left') arrows to start playing");
    alert("Use the keys ('up,'down',right','left') arrows to start playing");
};