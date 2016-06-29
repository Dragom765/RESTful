//this file makes a new, unique ID for each new bear that's posted

module.exports = {

	// until I learn how to make a con.query function through file reference,
	// I can't use the commented functions
	/*getIDs: function() {
	con.query("SELECT id FROM bears", function(err, id) {
		if(err)
			console.log(err.message)
		else
			bears_id = id;
	});
	},*/
	
	
	create: function() {		//creates an ID tag in hexidecimal form
		var hexNum;
		var digit = 0;
		for(i = 1; i < 20; i++){
			digit += (digit * 16) + Math.round(Math.random() * 16);
//when converted, this will be the same as (1*10) + 4 to make 14, just in base-16 instead of base-10
		};
		hexNum = digit.toString(16);
		return hexNum;
	}//,
/*
	match: function () {		//checks if id already exists
		for(i = 0; i < bears_id.length; i++){
			if (bears_id[i] === new_id)
				unique = false;
		};
	},

	makeIDs: function() {
		var bears_id = {};
		var new_id = "";
		var unique;
		var id;

		this.getIDs();
	
		do{
			unique = true;
			new_id = this.create();
			if(bears_id[0] !== null)
				this.match();
		}while(unique === false);
		return new_id;
	}
*/
};