var fs = require("fs");

var cardFileName = "basicCard.txt";

var BasicCard = function(front, back) {

  	//scope-safe
	if (!(this instanceof BasicCard)) { 
		return new BasicCard(front, back);
	}

	this.front = front;
	this.back= back;

};

/*
BasicCard.prototype.printInfo = function() {

    var logTxt = "\nfront: " + this.front + "\nback: " + this.back;

	console.log(logTxt);

    fs.appendFile("log.txt", logTxt, (error) => {  });
};
*/

BasicCard.prototype.printData = function() {

	var logObj = {
		front: this.front,
		back: this.back
	}

    //fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", (error) => { /* error */});
	fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", function(error, data){

      console.log(JSON.stringify(logObj));

    });
};


BasicCard.prototype.getData = function() {

	// JSON.parse
	
	fs.readFile(cardFileName, "utf8", function(err, data) {
	  if (err) {
	    console.log(err);
	  }

	  var dataArray = data.split("\n");

	  for (var i = 0; i < dataArray.length; i++) {
	    console.log(dataArray[i]);
	  }
	  
	});

};

module.exports = BasicCard;