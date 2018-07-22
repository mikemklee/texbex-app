const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Validation
const validateBookInput = require("../../validation/book");

// Load book Model
const Book = require("../../models/Book");

// @route   GET api/books
// @desc    Get books
// @access  Public
router.get("/", (req, res) => {
  Book.find()
    .sort({ date: -1 })
    .then(books => res.json(books))
    .catch(error => res.status(404));
});

// @route   GET api/books/search/:searchTerm
// @desc    Search books
// @access  Public
router.get("/search/:searchTerm", (req, res) => {
  Book.find({
    $or: [
      { title: req.params.searchTerm },
      { course: req.params.searchTerm },
      { description: req.params.searchTerm }
    ]
  })
    .sort({ date: -1 })
    .then(books => {
      if (books.length === 0) {
        console.log("no books!");
        errors.nobooks = "No textbooks found!";
        res.status(404).json(errors);
      }
      res.json(books);
    })
    .catch(error => res.status(404).json({ books: "No textbooks found!" }));
});

// @route   GET api/book/id/:id
// @desc    Get book by ID
// @access  Public
router.get("/id/:id", (req, res) => {
  const errors = {};
  Book.findOne({ _id: req.params.id })
    .then(book => {
      if (!book) {
        errors.nobook = "There is no book with this id!";
        res.status(404).json(errors);
      }
      res.json(book);
    })
    .catch(error =>
      res.status(404).json({ book: "There is no book with this id!" })
    );
});

// @route   POST api/books
// @desc    Create book
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateBookInput(req.body);

    // Check Validation
    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newBook = new Book({
      user: req.user.id,
      title: req.body.title,
      course: req.body.course,
      description: req.body.description,
      seller: req.body.seller,
      sellerPhoto: req.body.sellerPhoto,
      date: req.body.date
    });
    newBook.save().then(book => res.json(book));
  }
);

// @route   DELETE api/books/:id
// @desc    Delete book
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Book.findById(req.params.id)
      .then(book => {
        // Check for book owner
        if (book.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "User not authorized" });
        }

        // Delete
        book.remove().then(() => res.json({ success: true }));
      })
      .catch(error => res.status(404).json({ booknotfound: "No book found" }));
  }
);

module.exports = router;
