const mongoose = require('mongoose');

const Joi = require('joi')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        minlength: 50,
        maxlength: 255
    },
    website: {
        type: String,
        required: true
    }
})

const Author = mongoose.model('Author', authorSchema)

//Validating author with request
function validateAuthor(author) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        bio: Joi.string().min(50).max(255),
        website: Joi.string().required(),

    })

    return schema.validate(author)
}

exports.Author = Author

exports.validater = validateAuthor