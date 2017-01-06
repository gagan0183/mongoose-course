/**
 * Created by Gagan on 07-01-2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    author: String,
    category: String
});

module.exports = mongoose.model('Book', BookSchema);