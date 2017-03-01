//require things 
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table")

//create the connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "moments1",
	database: "bamazon"
});

//function that displays the table 
var displayTable = function(){
	connection.query("SELECT * FROM products", function(err, res) {
  		if (err) throw err;
  		console.table(res);
  		buy();
	});
}

//function that lets the user buy things 
var buy = function(){
	connection.query("SELECT * FROM products", function(err, res) {
		//console.log(res);
		inquirer.prompt([
	 		{
	 			name: "item",
				type: "input",
				message: "What is the item id number of the item you would like to buy?",
				validate: function(value) {
      				if (value <= 10) {
        				return true;
      				}
      				return false;
    			}			
			},{
				name: "quantity",
				type: "input",
				message: "How many would you like to buy?",	
			} 
		]).then(function(answers){
			console.log("\n========================")
			for (var i = 0; i < res.length; i++) {
				//console.log("hi" + res[i]);
        		if (res[i].item_id === parseInt(answers.item)) {
          			var chosenItem = res[i];
          			//console.log(chosenItem.product_name + "quantity " + chosenItem.stock_quantity);
          			if (chosenItem.stock_quantity > parseInt(answers.quantity)) {
          				var purchasePrice = chosenItem.price * answers.quantity;
          				//console.log(purchasePrice);
          				var newQuantity = chosenItem.stock_quantity - answers.quantity;
          				//console.log(newQuantity);
	             		connection.query("UPDATE products SET ? WHERE ?", [{
	               			stock_quantity: newQuantity
	             			}, {
	                		item_id: chosenItem.item_id
	             			}], function(err, res) {
	                			console.log("It's yours! Total price: $" + purchasePrice + "\n========================\n");
	                			displayTable();
	              			});
            		}else {
              			console.log("Insufficient quantity! \n========================\n");
              			displayTable();
            		}
				}
			}			
		});
	});	
}

//display table and start the program 
displayTable();