var keys = require("./client_id");
module.exports = {
	'facebookAuth' : {
		'clientID': 'enter client id here',
		'clientSecret': 'enter client secret here',
		'callbackURL': 'enter callback here'
	},

	'googleAuth' : {
		'clientID': keys.client_id,
		'clientSecret': keys.client_secret,
		'callbackURL': "https://teamprojecttwo.herokuapp.com/auth/google/callback"
	}
}