var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table")

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",

	password: "moments1",
	database: "bamazon"
});


//display table



//prompt the user to buy
// var buy = function(){

// 	inquirer.prompt([
// 		{
// 			name: "range1",
// 			type: "input",
// 			message: "What year would you like to begin",			
// 		},{
// 			name: "range2",
// 			type: "input",
// 			message: "What year would you like to end?",	
// 		} 
// 	]).then(function(answers){
		
// 		connection.query( "SELECT * FROM top5000 WHERE year BETWEEN ? AND ?", [answers.range1, answers.range2], function(err, result){  //? gets substituted for variable (genre)
// 			console.log("just the ${artist} songs: ");
			
// 			for (var i = 0; i< result.length; i++){
// 				console.log([
// 					result[i].position, 
// 					result[i].artist,
// 					result[i].song,
// 					result[i].year,
// 					result[i].raw_total,
// 					result[i].raw_usa,
// 					result[i].raw_uk,
// 					result[i].raw_eur,
// 					result[i].raw_row
// 					].join(" | ")
// 					);
// 				}
// 		});
// 	})
// }