const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	name: String,
	email: {
		type: String,
		unique: true
	},
	avatar:	Object,
	role: {
		type: String,
		default: "USER"
	},
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog"
		}
	],
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

userSchema.methods.comparePassword = async function(password){
	return await bcrypt.compare(password, this.passwordHash)
}

userSchema.methods.getJwtToken = async function(){
	return jwt.sign(
		{id: this._id, username: this.username},
		process.env.SECRET,
		{ expiresIn: 60*60 }
	)
}

const User = mongoose.model("User", userSchema)

module.exports = User