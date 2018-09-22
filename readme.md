# [ALTRU---Blockchain](https://nodejs-login.herokuapp.com)

[![ALTRU---Blockchain](./readme.img/ALTRU---Blockchain.jpg?raw=true)](https://nodejs-login.herokuapp.com)

### A basic account management system built in Node.js with the following features:

* New User Account Creation
* Secure Password Reset via Email
* Ability to Update / Delete Account
* Session Tracking for Logged-In Users
* Local Cookie Storage for Returning Users
* Blowfish-based Scheme Password Encryption


### ALTRU---Blockchain is built on top of the following libraries :

* [Node.js](http://nodejs.org/) - Application Server
* [Express.js](http://expressjs.com/) - Node.js Web Framework
* [MongoDB](http://mongodb.org/) - Database Storage
* [Pug](https://pugjs.org/) - HTML Templating Engine
* [Stylus](http://stylus-lang.com/) - CSS Preprocessor
* [EmailJS](http://github.com/eleith/emailjs) - Node.js > SMTP Server Middleware
* [Moment.js](http://momentjs.com/) - Lightweight Date Library
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library


## Installation & Setup
1. Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.org/) if you haven't already.
2. Clone this repository and install its dependencies.
		
		> git clone git@github.com:akhilpatlolla/ALTRU---Blockchain.git
		> cd ALTRU---Blockchain
		> npm install
		
3. In a separate shell start the MongoDB daemon.

		> mongod

4. From within the node-login directory, start the server.

		> node app or npm start
		
5. Open a browser window and navigate to: [http://localhost:3000](http://localhost:3000)

## Password Retrieval

To enable the password retrieval feature it is recommended that you create environment variables for your credentials instead of hard coding them into the [email dispatcher module](https://github.com/akhilpatlolla/ALTRU---Blockchain/blob/master/app/server/modules/email-dispatcher.js).

To do this on Unix system / OSX you can simply add them to your .profile or .bashrc file.

	export EMAIL_HOST='smtp.gmail.com'
	export EMAIL_USER='your.email@gmail.com'
	export EMAIL_PASS='1234'

[![ALTRU---Blockchain](./readme.img/retrieve-password.jpg?raw=true)](https://nodejs-login.herokuapp.com)

## Contributing

Questions and suggestions for improvement are welcome.