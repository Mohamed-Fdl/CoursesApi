const mongoose = require('mongoose');

const Joi = require('joi')

const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    authors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Author',
    }
}))



//VALIDATING COURSES WITH REQUEST
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
    })

    return schema.validate(course)
}

exports.Course = Course

exports.validater = validateCourse