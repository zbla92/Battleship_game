var view = {
    //this method takes a string message and displays it
    //in the message display area
    displayMessage: function(msg){
        var messageArea = document.querySelector('#messageArea');
        messageArea.innerHTML = msg;
    },
    //if player hits, ship will be displayed on the field player hit
    displayHit: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    //If player misses, MISS will be placed on the screen
    displayMiss: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class","miss");
    }
};


var model = {
    boardSize: 7,
    numShips: 3,
    shipLength:3,
    shipsSunk:0,

    ships: [{locations: ["06", "16", "26"], hits: ["", "", ""]},
            {locations: ["24", "34", "44"], hits: ["", "", ""]},
            {locations: ["10", "11", "12"], hits: ["", "", ""] }],

    fire: function (guess){
        
        for(var i = 0; i < this.numShips; i++){
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if(index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!")
                if (this.isSunk(ship)){
                    this.shipsSunk++;
                    view.displayMessage("SHIP DESTROYED! ! !")
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.")
        return false;
    },
    
    isSunk: function (ship){
        for(var i = 0; i< this.shipLength; i++){
            if (ship.hits[i] !== "hit"){
                return false;
            }
        }
        return true;
    },

    generateShipLocations: function () {
        var locations;
        for (var i = 0; i < this.numShips; i++){
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: () => {
        var direction = Math.floor(Math.random() * 2);
        var row, col;

        if (direction === 1) {
            //Generate a strng location for a  horizontal ship
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.randdom() * this.boardsize - this.shipLength)
        } else {
            row = Math.floor(Math.random() * this.boardsize - this.shipLength);
            col = Math.floor(Math.random() * this.boardsize);
        }

        var newShipLocations = [];
        for (var i = 0; i < this.shipLength; i++){
            if (direction === 1) {
                //Add location to array for  new horizontal ship
                newShipLocations.push(row+ "" + (col + i));
            } else {
                // Add location to array for new vertical ship
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: () => {
        for (var i = 0; i < this.numShips; i++){
            var 
        }
    }
    
};



var controller = {
    guesses: 0,

    processGuesses: function (guess){
        var location = parseGuess(guess);
        if(location){
            this.guesses++;
            var hit = model.fire(location);
            if(hit && model.shipsSunk === model.shipsSunk){
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses.");
            }
        }
    }
};


function parseGuess (guess){
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"]
    if(guess === null || guess.length !== 2){
        alert("OOPS, please enter a letter followerd by a number on the board.");
    } else{
        firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)){
            alert("OOPS, that isnt on the board.");
        } else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
            alert("OOPS, that;s off the board.")
        } else {
            return row + column;
        }
    }
    return null;
};

function handleKeyPress(e){
    var fireButton = document.getElementById("fireButton");
    if(e.keyCode === 13) {
        fireButton.click();
        return false;
    }
};

function handleFireButton(){
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuesses(guess);

    guessInput.value = "";

};


function init(){
    var fireButton= document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
};


window.onload = init;