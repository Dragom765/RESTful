// BASE SETUP
// =============================================================================

// call the packages we need
var mysql      = require("mysql");										// call mysql
var express    = require('express');    	   				  // call express
var app        = express();            	  		  		  // define our app using express
var bodyParser = require('body-parser');
var Bears      = require('./app/models/bear');				// attaches our Bears constructor
var con        = require('./app/connections/db.js');	// makes the connection
var new_id     = require('./app/tools/new_id.js');			// makes a new id number

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

con.connect( function(err) {
	if(err)
		throw err;
	else
		console.log("You're connected.");
});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Hooray! Welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
    
		var bear = new Bears();      // create a new instance of the Bear model
		bear.name = req.body.name;   // set the bear name (comes from the request)
		bear.id = new_id.create();   // later, add check to make sure no id is the same

		con.query("INSERT INTO bears SET ?", bear, function(err) {
			if (err)
				res.send(err.message);
			else
				res.json({ message: 'Bear created!' });
        });

    })
	
	.get(function(req, res) {
			con.query("SELECT * FROM bears", function(err, bears) {
				if(err)
					res.send(err.message);
				else
					res.json(bears)
			});
	});
	
router.route('/bears/:bear_id')
	
	// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		
		var searchID = req.params.bear_id;
		
		con.query("SELECT * FROM bears WHERE id = ?", searchID, function(err, bear) {
			if(err)
				res.send(err);
			
			res.json(bear);
		});
	})
	
	.put(function(req, res) {
		
		var param = [];
		param[0] = req.body.name;
		param[1] = req.params.bear_id;
		
		con.query("UPDATE bears SET name = ? WHERE id = ?", param, function(err) {
			if(err)
				res.send(err.message);
			
			res.json({ message: "Bear updated!" });
		});
	})
	
	.delete(function(req, res) {
		
		var deleteID = req.params.bear_id;
		
		con.query("DELETE FROM bears WHERE id = ?", deleteID, function(err, bear){
			if(err)
				res.send(err.message);
			
			res.json({ message: "Successfully deleted!"});
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);