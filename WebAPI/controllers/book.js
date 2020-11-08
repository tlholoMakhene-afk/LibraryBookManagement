const mongoose = require("mongoose");
const Book = require("../models/book");
const API_DOMAIN = "http://localhost:3000";

exports.books_get_all = (req, res, next) => {
    Book.find()
    .select("title author date_of_publication book_category _id ")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        books: docs.map(doc => {
          return {
            title: doc.title,
            author: doc.author,
            year: doc.date_of_publication,
            category: doc.book_category,
            _id: doc._id,
            request: {
              type: "GET",
              url: API_DOMAIN + "/books/" + doc._id
            }
          };
        })
      };
     if (docs.length >= 0) {
      res.status(200).json(response);
       } else {
             res.status(404).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.books_create_book = (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    date_of_publication: req.body.date_of_publication,
    book_category: req.body.book_category,
  });
  book
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created book successfully",
        createdBook: {
          title: result.title,
          author: result.author,
          _id: result._id,
          request: {
            type: "GET",
            url: API_DOMAIN + "/books/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.books_get_book = (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    .select("title author date_of_publication book_category _id ")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          book: doc,
          request: {
            type: "GET",
            url: API_DOMAIN + "/books"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.books_update_book = (req, res, next) => {
  const id = req.params.bookId;
  const updateOps =  { "title": req.body.title, "author": req.body.author, "date_of_publication": req.body.date_of_publication,"book_category": req.body.book_category};
  Book.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Book updated",
        request: {
          type: "GET",
          url: API_DOMAIN + "/books/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.books_delete = (req, res, next) => {
  const id = req.params.bookId;
  Book.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Book deleted",
        request: {
          type: "POST",
          url: API_DOMAIN + "/books",
          body: { title: "String", author: "String", date_of_publication: "Number",book_category: "String"}
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};