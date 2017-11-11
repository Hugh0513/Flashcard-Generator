// Import objects
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");
var fs = require("fs");

// Import npm
var inquirer = require("inquirer");

// Select create or view cards
function start() {
	inquirer
		.prompt([
		  	{
			    name: "menu",
			    type: "list",
				message: "Which card would you like to create?",
				choices: ["Create Card", "Display Cards"]
			}
		])
		.then(function(answers) {
			//console.log(answers);
			
			if (answers.menu === "Create Card") {
				selectCardType();
			}
			else {
				displayCards();
			}

		});
};

// Select Card Type
function selectCardType() {
	inquirer
		.prompt([
		  	{
			    name: "cardType",
			    type: "list",
				message: "Which card would you like to create?",
				choices: ["Cloze", "Basic"]
			}
		])
		.then(function(answers) {
			//console.log(answers);

			if (answers.cardType === "Cloze") {
				createClozeCard();
			}
			else {
				createBasicCard();
			}
		});
};


// Create cloze card
function createClozeCard() {
	inquirer
	    .prompt([
	      {
	        name: "fullText",
	        type: "input",
	        message: "Input full of the sentense."
	      },
	      {
	        name: "cloze",
	        type: "input",
	        message: "Input cloze."
	      }
	    ])
	    .then(function(answers) {

	    	var clozeInput = answers.cloze.trim();
	    	var textInput = answers.fullText.trim();

		    if (clozeInput !== "" || textInput !=="") {
		    	// print into text file.
		    	var newCard = new ClozeCard(answers.fullText, answers.cloze);
		    	
		    	//newCard.printData();
		    	
		    	console.log(newCard.ifOK);//[Function]
		    	//ifContinue();
		    	if (newCard.ifOK === true) {
		    		printClozeData(newCard.cloze, newCard.partial, newCard.fullText, "clozeCard.txt");
		    	}
		    	
		    }
		    else {
		    	console.log("Woops! Input again.")
		    	createClozeCard();
		    }
	    });
};

// Create basic card
function createBasicCard() {
	inquirer
	    .prompt([
	      {
	        name: "front",
	        type: "input",
	        message: "Input front."
	      },
	      {
	        name: "back",
	        type: "input",
	        message: "Input full of the sentense."
	      }
	    ])
	    .then(function(answers) {
	    	
	    	var frontInput = answers.front.trim();
	    	var backInput = answers.back.trim();

		    if (frontInput !== "" || backInput !=="") {

		    	// print into text file.
		    	var newCard = new BasicCard(answers.front, answers.back);
		    	
		    	//newCard.printData();

		    	//ifContinue();

		    	printBasicData(newCard.front, newCard.back, "basicCard.txt");
		    }
		    else {
		    	console.log("Woops! Input again.")
		    	createBasicCard();
		    }

	    });
};

// Display cards
function displayCards() {
	inquirer
		.prompt([
		  	{
			    name: "cardType",
			    type: "list",
				message: "Which card would you like to display?",
				choices: ["Cloze", "Basic"]
			}
		])
		.then(function(answers) {
			//console.log(answers);

			if (answers.cardType === "Cloze") {
				displayClozeCard();
			}
			else {
				displayBasicCard();
			}
		});

}

function displayClozeCard() {
	//var newCard = new ClozeCard("none", "none");
	//newCard.getData();
	getData("clozeCard.txt");
	//ifContinue();
}

function displayBasicCard() {
	//var newCard = new BasicCard("none", "none");
	//newCard.getData();
	getData("basicCard.txt");
	//ifContinue();
}

// Continue or Exit
function ifContinue() {
	inquirer
	    .prompt([
	      {
	        name: "isContinue",
	        type: "list",
	        message: "Would you like to conitnue?",
			choices: ["Continue", "End"]
	      }
	    ])
	    .then(function(answers) {
	    	if (answers.isContinue === "Continue") {
	    		start();
	    	} 
	    	else{
	    		return;
	    	}
	    });
};

function printClozeData(cloze, partial, fullText, cardFileName) {

	var logObj = {
		cloze: cloze,
		prtial: partial,
		fullText: fullText
	}

    //fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", (error) => { /* error */});
	fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", function(error, data){

      console.log(JSON.stringify(logObj));

      ifContinue();

    });
};

function printBasicData(front, back, cardFileName) {

	var logObj = {
		front: front,
		back: back
	}

    //fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", (error) => { /* error */});
	fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", function(error, data){

      console.log(JSON.stringify(logObj));

      ifContinue();

    });
};

// Display Cards data on terminal/bash
function getData(fileName) {
	
	fs.readFile(fileName, "utf8", function(err, data) {
	  if (err) {
	    return console.log(err);
	  }

	  var dataArray = data.split("\n");

	  console.log("\n");

	  for (var i = 0; i < dataArray.length; i++) {
	    console.log(dataArray[i]);
	  }

	  ifContinue();
	});

};

// Main
start();
