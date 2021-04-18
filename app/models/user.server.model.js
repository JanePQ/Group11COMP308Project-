const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
	lastName: String,
	email: {
		type: String,
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	username: {
		type: String,
		unique: true,
		required: 'Username is required.',
		trim: true
	},
	password: {
		type: String,
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer.'
		]
	},
	role: {
		type: String,
		required: 'Role is required.'
	}
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

UserSchema.methods.authenticate = function(password) {
	return this.password === bcrypt.hashSync(password, saltRounds);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);