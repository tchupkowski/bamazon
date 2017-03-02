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



var menu = function() {
	inquirer.prompt([
		{
			name: "post",
			type: "list",
			message: "What would you like to do?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		} 
	]).then(function(answers){
		if (answers.post === "View Products for Sale") {
			viewProducts();
		} 
		if (answers.post === "View Low Inventory") {
			viewLow();
		}
		if (answers.post === "Add to Inventory") {
			addInventory();
		} 
		if (answers.post === "Add New Product") {
			addProducts();
		}	
	});
};

menu();

var viewProducts = function(){
	connection.query("SELECT * FROM products", function(err, res) {
  		if (err) throw err;
  		console.table(res);
  		menu();
	});
}

var viewLow = function(){
	connection.query( "SELECT * FROM products WHERE (stock_quantity <5)", function(err, res){  //? gets substituted for variable (genre)
		console.table(res);
		menu();			
	});
}

var addInventory = function(){
	connection.query("SELECT * FROM products", function(err, res) {
  		if (err) throw err;
  		console.table(res);
  		console.log("\n");
  		inquirer.prompt([
		{
			name: "item",
			type: "input",
			message: "What Item ID number would you like to add more of?",			
		},{
			name: "quantity",
			type: "input",
			message: "How many would you like to add?",	
		} 
		]).then(function(answers){
			var i = parseInt(answers.item) - 1;
			//console.log(res[i].stock_quantity);
			// var chosenItem = res[i];
			// console.log(chosenItem);
			var new_quantity = res[i].stock_quantity + parseInt(answers.quantity);
			//console.log(new_quantity);
			connection.query("UPDATE products SET ? WHERE ?", [{
	            stock_quantity: new_quantity 
	        },{
	            item_id: answers.item
	        }], function(err, res) {
	            console.log("\n Inventory updated successfully! \n");
	            menu();
	        });
		});
	});	
}

var addProducts = function() {
  inquirer.prompt([{
    name: "itemID",
    type: "input",
    message: "What is the item ID of the product you would like to Add?"
  }, {
    name: "item",
    type: "input",
    message: "What is the name of the product you would like to Add?"
  }, {
  	name: "department",
    type: "input",
    message: "What department would you like to place your item in?"
  }, {
  	name: "price",
    type: "input",
    message: "What will the price of the item be?"
  },{
    name: "quantity",
    type: "input",
    message: "What would you like your starting quantity to be?",    
  }]).then(function(answer) {
    connection.query("INSERT INTO products SET ?", {
      item_id: answer.itemID,
      product_name: answer.item,
      department_name: answer.department,
      price: answer.price,
      stock_quantity: answer.quantity
    }, function(err, res) {
      console.log("Your product was added successfully!");
      menu();
    });
  });
};