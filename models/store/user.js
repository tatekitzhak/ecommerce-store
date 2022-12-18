/*
I find myself recreating user models for Mongoose every time I start a new project, so I thought I'd create a generic schema for a user model that can be added to or modified as need be.
This is loosely based on the Meteor user model (using a "profile" sub-object for the user's personal information). It also includes an optional geolocation point for the user, and Mongoose timestamps, as well as a pre("save") function to bcrypt the user password and a comparePassword() function.
Just save this file wherever you store your models and do something like const Users = include('./models/userSchema.js') and you can just use it as a standard Mongoose user model.
The username/email address definitions were copied from this tutorial: https://thinkster.io/tutorials/node-json-api/creating-the-user-model
*/

const mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	uniqueValidator = require('mongoose-unique-validator'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

const Email = new Schema({
	address: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, "{PATH} can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true
	},
	// Change the default to true if you don't need to validate a new user's email address
	validated: { type: Boolean, default: true }

});


const Point = new Schema({
	type: {
		type: String,
		enum: ['Point'],
		// required: true
	},
	coordinates: {
		type: [Number],
		// required: true
	}
});

const UserSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: [true, "{PATH} can't be blank"],
		match: [/^[a-zA-Z0-9]+$/, '{PATH} is invalid'],
		index: true
	},
	//Our password is hashed with bcrypt
	password: { type: String, required: true },
	email: {
		type: Email,
		required: true
	},
	profile: {
		firstName: String,
		lastName: String,
		avatar: String,
		bio: String,
		birthday: {
			type: Date
		},
		address: {
			street1: String,
			street2: String,
			city: String,
			state: String,
			country: String,
			zip: String,
			location: {
				type: Point,
				required: false
			}
		}
	},
	gender:{
		type:String,
		enum:['male','female','others']
	},
	role: {
		type: String, enum: ['user', 'admin','root'],
		required: false
	},
	status:{
		type:String,
		enum:['active','inactive','frequent'],
		default:'active'
	},
	reviews: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review'
		}],
	books: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Book'
		}]
}, {
	timestamps: true
});

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

UserSchema.pre("save", async function (next) {

	try {
		if (!this.isModified("password")) {
			return next();
		}
		this.password = bcrypt.hashSync(this.password, 10);

		return next();
	} catch (error) {
		return next(error);
	}
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
	return callback(null, bcrypt.compareSync(plaintext, this.password));
};
/**
 
[
    {
        "username":"ran",
        "password": "ran",
        "email":{
            "address":"ran@gmail.com"
        },
        "profile": {
            "address": {
                "street1": "Israel",
                "city": "TLV"
            },
            "firstName": "Ran",
            "lastName": "Itzhak",
            "bio": "My favourite fruit is apples and bananas."
        }
    }
]
 */

module.exports = mongoose.model("User", UserSchema);