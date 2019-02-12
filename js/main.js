var view = {
    //this method takes a string message and displays it
    //in the message display area
    displayMessage: function(msg){
        var messageArea = document.querySelector('#messageArea');
        messageArea.innerHTML = msg;
    },
    //If player misses, MISS will be placed on the screen
    displayMiss: function(location){

    },
    //if player hits, ship will be displayed on the field player hit
    displayHit: function(location){
        //code motherfucker
    }
}

