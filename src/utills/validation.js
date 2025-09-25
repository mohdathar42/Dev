const validator = require("validator");

const validateSignUpData = (req) => {
  //validate the req data from api's
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("please enter full name...");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter a valid emailId...");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter a  Strong Password");
  }
};

 module.exports=validateSignUpData;