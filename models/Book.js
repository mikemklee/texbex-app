const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true,
    max: 40
  },
  course: {
    type: String,
    required: true
  },
  school: {
    type: String
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    max: 200
  },
  seller: {
    type: String
  },
  sellerPhoto: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model("book", BookSchema);
