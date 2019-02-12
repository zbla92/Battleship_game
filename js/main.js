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
    shipSunk:0,

    ships: [{locations: ["06", "16", "26"], hits: ["", "", ""]},
            {locations: ["24", "34", "44"], hits: ["", "", ""]},
            {locations: ["10", "11", "12"], hits: ["", "", ""] }],

    fire: function (guess){
        
        for(var i = 0; i < this.numShips; i++){
            var ship = this.ships[i];
        }
    }
};