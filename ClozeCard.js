var fs = require("fs");

var cardFileName = "clozeCard.txt";

var ClozeCard = function(text, cloze) {

	//console.log("test");
	var isOK = false;

	//scope-safe
	if (!(this instanceof ClozeCard)) { 
		return new ClozeCard(text, cloze);
	}

	if (!text.match(cloze)){
		console.log("The cloze doesn't appear in the text.");
		
		return {error: false};

	}
	else {
		var partial = text.replace(cloze, "..."); // Remove cloze from text

		this.cloze = cloze;
		this.partial = partial;
		this.fullText = text;
		
		return {
			cloze: this.cloze,
			partial: this.partial,
			fullText: this.fullText,
			error: true
		};
	}


};

ClozeCard.prototype.printData = function() {

	var logObj = {
		cloze: this.cloze,
		prtial: this.partial,
		fullText: this.fullText
	}

    //fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", (error) => { /* error */});
	fs.appendFile(cardFileName, JSON.stringify(logObj) + "\n", function(error, data){

      console.log(JSON.stringify(logObj));
      return {error: true};

    });
};

ClozeCard.prototype.getData = function() {

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


module.exports = ClozeCard;
