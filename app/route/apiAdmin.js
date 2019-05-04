var bodyParser = require('body-parser'); 	// get body-parser
//var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var bcrypt 	   = require('bcrypt-nodejs');
var config     = require('../../config');
var mysql 	   = require('mysql');
var connection = mysql.createConnection(config.connection);

connection.query('USE ' + config.database);

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// route to generate sample user
	
	apiRouter.post('/sample', function(req, res) {

        connection.query("SELECT * FROM users WHERE username = ?",['md'], function(err, rows) {
            if (err)
                return res.send(err);
            if (!rows.length) {
                var newUserMysql = {
                    username: 'md',
                    password: bcrypt.hashSync('6161', null, null),  // use the generateHash function in our user model
                    name: 'mustafa',
                    surname: 'duzenli'
                };
                var insertQuery = "INSERT INTO users ( username, password, name, surname ) values (?,?,?,?)";
                connection.query(insertQuery,[newUserMysql.username, 
                							  newUserMysql.password, 
                							  newUserMysql.name,
                							  newUserMysql.surname],function(err, rows) {
	                if (err)
	                    return res.send(err);                    	
                    newUserMysql.id = rows.insertId;
					// return a message
					res.json({ message: 'User md created!' });
                });                
            } else {
            	console.log(rows[0]);

				rows[0].password = bcrypt.hashSync('6161', null, null);
                var updateQuery = "UPDATE users SET username = ?, password = ?, name = ?, surname = ? WHERE id = " + rows[0].id;
                connection.query(updateQuery,[rows[0].username, rows[0].password, rows[0].name,, rows[0].surname],function(err, rows) {
	                if (err)
	                    return res.send(err);                    	
					// return a message
					res.json({ message: 'User md updated!' });
                });
            }
        });

	});

	// route to authenticate a user (POST http://localhost:8080/api/authenticate)
	apiRouter.post('/authenticate', function(req, res) {

	  connection.query("SELECT * FROM users WHERE username = ?",[req.body.username], function(err, users){	
	    if (err) throw err;

	    // no user with that username was found
	    if (!users.length) {
	      res.json({ 
	      	success: false, 
	      	message: 'Authentication failed. User not found.' 
	    	});
	    } else {
	      // check if password matches
	      if (!bcrypt.compareSync(req.body.password, users[0].password)) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      } else {

	        // if user is found and password is right
	        // create a token
	        var token = jwt.sign({
	        	name: users[0].name,
	        	username: users[0].username
	        }, superSecret, {
	          expiresInMinutes: 1440 // expires in 24 hours
	        });

	        // return the information including token as JSON
	        res.json({
	          success: true,
	          message: 'Enjoy your token!',
	          token: token
	        });
	      }   

	    }

	  });
	});

	// route middleware to verify a token
	apiRouter.use(function(req, res, next) {
	  // do logging
      console.log('Somebody just came to our app!');

	  // check header or url parameters or post parameters for token
	  var token = req.body.token || req.query.token || req.headers['x-access-token'];

	  // decode token
	  if (token) {

	    // verifies secret and checks exp
	    jwt.verify(token, superSecret, function(err, decoded) {      

	      if (err) {
	        res.status(403).send({ 
	        	success: false, 
	        	message: 'Failed to authenticate token.' 
	    	});  	   
	      } else { 
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;
	            
	        next(); // make sure we go to the next routes and don't stop here
	      }
	    });

	  } else {

	    // if there is no token
	    // return an HTTP response of 403 (access forbidden) and an error message
   	 	res.status(403).send({ 
   	 		success: false, 
   	 		message: 'No token provided.' 
   	 	});
	    
	  }
	});

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) {
			
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("SELECT * FROM users WHERE username = ?",[req.body.username], function(err, rows) {
                if (err)
                    return res.send(err);
                if (rows.length) {
                    return res.json({ success: false, message: 'A user with that username already exists. '});
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUserMysql = {
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, null, null),  // use the generateHash function in our user model
                        name: req.body.name
                    };

                    var insertQuery = "INSERT INTO users ( username, password, name ) values (?,?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password, newUserMysql.name],function(err, rows) {
		                if (err)
		                    return res.send(err);                    	
                        newUserMysql.id = rows.insertId;
						// return a message
						res.json({ message: 'User created!' });
                    });
                }
            });
		})

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) {
		  connection.query("SELECT id,username,name,surname FROM users", function(err, users){	
		    if (err) 
		    	return res.send(err);
			// return the users
			res.json(users);		
		  });
		});

	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
		.get(function(req, res) {
			
            connection.query("SELECT id,username,name,surname FROM users WHERE id = ?",[req.params.user_id], function(err, rows) {
                if (err)
                    return res.send(err);
                if (!rows.length) {
                    return res.json({ success: false, message: 'A user not found! '});
                } else {
					// return that user
					res.json(rows[0]);
                }
            });			
			
		})

		// update the user with this id
		.put(function(req, res) {
			
            connection.query("SELECT * FROM users WHERE id = ?",[req.params.user_id], function(err, rows) {
                if (err)
                    return res.send(err);
                if (!rows.length) {
                    return res.json({ success: false, message: 'A user not found! '});
                } else {
					// set the new user information if it exists in the request
					if (req.body.name) 	   rows[0].name 	= req.body.name;
					if (req.body.username) rows[0].username = req.body.username;
					if (req.body.password) rows[0].password = req.body.password;
				
                    var updateQuery = "UPDATE users SET username = ?, password = ?, name = ? WHERE id = " + req.params.user_id;

                    connection.query(updateQuery,[rows[0].username, rows[0].password, rows[0].name],function(err, rows) {
		                if (err)
		                    return res.send(err);                    	
						// return a message
						res.json({ message: 'User updated!' });
                    });
                }
            });
            
		})
            
		// delete the user with this id
		.delete(function(req, res) {
			
            connection.query("SELECT * FROM users WHERE id = ?",[req.params.user_id], function(err, rows) {
                if (err)
                    return res.send(err);
                if (!rows.length) {
                    return res.json({ success: false, message: 'A user not found. '});
                } else {

                    var deleteQuery = "DELETE FROM users WHERE id = " + req.params.user_id;

                    connection.query(deleteQuery,function(err, rows) {
		                if (err)
		                    return res.send(err);                    	
						// return a message
						res.json({ message: 'Successfully deleted!' });
                    });
                }
            });
            
		});

	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

	return apiRouter;
};