const express = require("express");
const router = express.Router();
const BooksController = require('../controllers/book');


router.get("/", BooksController.books_get_all);

router.post("/",  BooksController.books_create_book);

router.get("/:bookId", BooksController.books_get_book);

router.patch("/:bookId",  BooksController.books_update_book);

router.delete("/:bookId", BooksController.books_delete);

module.exports = router;