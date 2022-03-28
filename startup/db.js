const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost/playground')
        .then(function() {
            console.log('Connected to mongodb');
        })
        .catch(function(err) {
            console.log('Could not connect to mongodb');
        })
}