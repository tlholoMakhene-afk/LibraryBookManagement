const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    date_of_publication: { type: Number, required: true },
    book_category: { type: String, required: true },
});

module.exports = mongoose.model('Book', bookSchema);