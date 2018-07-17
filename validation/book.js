const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateBookInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.course = !isEmpty(data.course) ? data.course : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  // Validate title
  if (
    !Validator.isLength(data.title, {
      min: 2,
      max: 100
    })
  ) {
    console.log(data.title);
    errors.title = "Title needs to be between 2 and 100 characters";
  }

  if (Validator.isEmpty(data.title)) {
    console.log(data.title);
    errors.title = "Textbook title is required";
  }

  // Validate course
  if (Validator.isEmpty(data.course)) {
    console.log(data.course);
    errors.course = "The course that uses this textbook is required";
  }

  // Validate description
  if (
    !Validator.isLength(data.description, {
      min: 2,
      max: 1000
    })
  ) {
    console.log(data.description);
    errors.description =
      "Description needs to be between 2 and 1000 characters";
  }

  if (Validator.isEmpty(data.description)) {
    console.log(data.description);
    errors.description = "Textbook description is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
