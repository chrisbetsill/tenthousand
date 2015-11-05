// The functions the API server sees

module.exports = {

	/*****************************************
		result = { 	error:false,
				 	errors:['none'],
					time:<time>};
	*/
	from_api_get_time: function(){
		var result = { 	error:false,
						errors:[],
						time: call_get_time()
						}
		return result;
	},
	/*****************************************/




	/*****************************************
	 	incoming = {
					user_id:<user_id>,
					turn_length:<turn_length>
				};

		returns
		result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	game_id: <game_id>
			};
	*/
	from_api_create_game:function(incoming){
		console.log("not implemented");
	},
	/*****************************************/


	/*****************************************
	 	incoming = {
					user_id:<user_id>,
					game_id:<game_id>,
				};

		returns
		result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	players: [<player1_name>,<player2_name>,<player3_name>,<player4_name>]; //possibly null
			};
	*/
	from_api_join_game:function(incoming){
		console.log("not implemented");
	},
	/*****************************************/




	/*****************************************
	 	incoming = {
					game_id:<game_id>,
				};

		returns
		result = {
				error: <true/false>,
			 	errors:[list of errors],
			 	time_started: <absolute time when game started>
			};
	*/
	from_api_start_game:function(incoming){
		console.log("not implemented");
	},
	/*****************************************/


	/*****************************************
	 	incoming = {
					game_id:<game_id>,
					user_id:<user_id>,
				};

		returns null;
	*/
	from_api_player_is_done:function(incoming){
		console.log("not implemented");
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
	return s ? "_" + p.substr(0,4) + "_" + p.substr(4,4) : p ;
}

var call_get_time = function() {
	var currentTime = new Date();
	return currentTime.getHours().toString()
		+ ":" + currentTime.getMinutes().toString()
		+ ":" + currentTime.getSeconds().toString();
};



var sysCurrentTime = call_get_time();

console.log(call_get_time());



//Proposed game state functions and objects follow:

//creates new game object
function game(gameID, gameCreator, listOfPlayers, turnLimit, startTime, whoseTurn, currentTime) {
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
	//the time the game was started at - started playing, NOT time at which game was created
	this.startTime = startTime;
	//playerID of the player whose turn it is now
	this.whoseTurn = whoseTurn;
	this.currentTime = sysCurrentTime;
}

//var name should be gameID with all dashes replaced with underscores
var xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx = new game("xxxxxxxx_xxxx_xxxx_xxxx_xxxxxxxxxxxx",
	"player1", ["player1", "player2", "player3", "player4", "player5"], 3.5, "NA", "player1", sysCurrentTime);

//var name should be gameID with all dashes replaced with underscores
var yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy = new game("yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy",
	"player6", ["player6"], 5.0, "NA", "player6", sysCurrentTime);

var createGame = function(playerID, turnLimit) {
	//will initialize a game object and transition creator to "join game" lobby,
	//where other players will appear when they submit appropriate gameID
	//will also declare gameID to the creator so others can join
}

//Needs work
var startGame = function(game) {
	game.startTime = sysCurrentTime;
	console.log("The start time: " + game.startTime);
	return game.startTime;
}

//Needs work
var advanceTurn = function(game) {
	var currentPlayer = game.whoseTurn;
	console.log("Current time: " + call_get_time());
	if (game.startTime === game.currentTime) {
		currentPlayer = game.listOfPlayers[0];
	}
	//else if (sysCurrentTime >= game.startTime + game.turnLimit) {
	//	currentPlayer = game.listOfPlayers[]
	//}
	console.log("Current player: " + currentPlayer);
}

startGame(yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);
advanceTurn(yyyyyyyy_yyyy_yyyy_yyyy_yyyyyyyyyyyy);






/* Player object likely not necessary given array of players in game object

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

	*/