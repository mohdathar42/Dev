
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");


 const adminAuth = (req, res, next) => {
  const token = "hi";
  const isAdminAuthorizes = token === "hi";
  if (!isAdminAuthorizes) {
    res.status(401).send("unauthorised user");
  } else {
    next();
  }
};

 const userAuth = async (req, res, next) => {
  try {
    //read the token from req 
    const { token } = req.cookies
    if (!token) {
       res.status(401).send("  invalid  token.....");
    }
    //validate the token 
    const verifyToken = await jwt.verify(token, "atharKhan@123")
    const { _id } = verifyToken;
    //find the user with the token and attach the user to req object
    const loggedInUser = await User.findById(_id)
    if (!loggedInUser) {
        res.status(401).send("unauthorised user no user found.....");
    }
    req.loggedInUser=loggedInUser;
    next();
  } catch (err) {
      res.status(400).send("unauthorised user" + err.message)
  }
};

module.exports = { adminAuth, userAuth };