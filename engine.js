// The functions the API server sees

module.exports = {
	//get_time returns the system's current time
	get_time: function(){
		var currentTime = new Date();
		return currentTime.getHours().toString() + ":" + currentTime.getMinutes().toString() + ":" + currentTime.getSeconds().toString();
	},
	
	//createID returns a random GUID for use as a game ID
	create_ID : function(){
    	return call_create_ID();
	},

	validate_ID : function(id){
		if (call_create_ID.validGames.indexOf(id) > -1){
			return true;
		}
		else{
			return false;
		}
	}
};

// stores all the valid games in a static array
call_create_ID.validGames = [];

// creates a new GUID and stores the new id in a static array
function call_create_ID(){
	var id = helper_create_ID() + helper_create_ID(true) + helper_create_ID(true) + helper_create_ID();
	call_create_ID.validGames.push(id);
	return id;
};

// helper function for the create_ID function
var helper_create_ID = function(s) {
	var p = (Math.random().toString(16)+"000000000").substr(2,8);
	return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
}

//Proposed game state functions and objects follow:

//creates a new player object
function player(gameID, playerID, color, isTurn) {
	//gameID randomly created when player creates new game, or specified when player joins game
	this.gameID = gameID;
	//playerID specified when player creates new game or when player joins game
	//may need different player ID number separate from this one to allow players of same ID in different games
	//possibly make var name concatenation of gameID and playerID
	this.playerID = playerID;
	//color assigned to player based on order joined or started: red, blue, green, yellow, purple
	this.color = color;
	//boolean declaring whether it is this player's turn in the game
	this.isTurn = isTurn;
}

var player1 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	"Player 1", "red", true);

var player2 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	"Player 2", "blue", false);

var player3 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	"Player 3", "green", false);

var player4 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	"Player 4", "yellow", false);

var player5 = new player("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	"Player 5", "purple", false);

//var names for players must be unique across all games
//var names could be concatenation of gameID and playerID to allow two players of same IDs in different games
var player6 = new player("yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
	"Player 1", "red", true);

//creates new game object
function game(gameID, gameCreator, listOfPlayers, turnLimit, whoseTurn, currentTime) {
	//gameID randomly created when player creates new game, or specified when player joins game
	this.gameID = gameID;
	//playerID of the player who created this game
	//may be used to establish baseline for turn sequence, or may be unnecessary
	this.gameCreator = gameCreator;
	//array of all players within game - number of player objects created with specified gameID
	//should be in order of time joined and will determine turn sequence?
	this.listOfPlayers = listOfPlayers;
	//time limit specified by gameCreator for maximum turn length
	this.turnLimit = turnLimit;
	//playerID of the player whose turn it is now
	this.whoseTurn = whoseTurn;
	this.currentTime = currentTime;
}

var game1 = new game("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
	player1, [player1, player2, player3, player4, player5], 3.5, player1);

var game2 = new game("yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy",
	player6, [player6], 5.0, player6);

