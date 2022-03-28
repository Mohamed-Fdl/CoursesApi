const Joi = require('joi')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const { boolean } = require('joi')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    })
    //that is statics method

//userSchema.statics.nameOfFunction = function(){} 
//that is a instance method
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.app_jwtPrivateKey)
    return token
}

const User = mongoose.model('User', userSchema)



//VALIDATING CustomerS WITH REQUEST
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024)
    })

    return schema.validate(user)
}

exports.User = User

exports.validater = validateUser