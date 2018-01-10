var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    hash: String,
    salt: String,
    role: {
        type: String,
    },
    emailVerified: { type: Boolean, default: false },
    dateSubmitted: Date
});

UserSchema.plugin(mongooseUniqueValidator, { message: 'is already taken.' });

UserSchema.methods.validPassword = function(Password) {
    var hash = crypto.pbkdf2Sync(Password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.setPassword = function(Password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(Password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 0.1);
    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.toAuthJSON = function() {
    return {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role
    };
};

UserSchema.methods.toProfileJSONFor = function(user) {
    return {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        //image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    };
};

mongoose.model('User', UserSchema);