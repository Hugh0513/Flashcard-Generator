var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

var inquirer = require("inquirer");

/*** BasicCard ***/
console.log("********** BasicCard ***********");
var firstPresident = new BasicCard(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 


/*** ClozeCard ***/
console.log("********** ClozeCard ***********");
var firstPresidentCloze = new ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States."
console.log(firstPresidentCloze.partial); 

// "George Washington was the first president of the United States."
console.log(firstPresidentCloze.fullText);

// Should throw or log an error because "oops" doesn't appear in "This doesn't work"
var brokenCloze = new ClozeCard("This doesn't work", "oops");


/*** scope-safe BasicCard ***/
console.log("*** scope-safe BasicCard ***");
var firstPresident = BasicCard(
    "Who was the first president of the United States?", "George Washington");

// "Who was the first president of the United States?"
console.log(firstPresident.front); 

// "George Washington"
console.log(firstPresident.back); 

/*** scope-safe ClozeCard ***/
console.log("*** scope-safe ClozeCard ***");
var firstPresidentCloze = ClozeCard(
    "George Washington was the first president of the United States.", "George Washington");

// "George Washington"
console.log(firstPresidentCloze.cloze); 

// " ... was the first president of the United States."
console.log(firstPresidentCloze.partial); 

// "George Washington was the first president of the United States."
console.log(firstPresidentCloze.fullText);

/*** prototype method ***/
console.log("*** prototype method ***");
firstPresidentCloze.printInfo();
firstPresidentCloze.getData();