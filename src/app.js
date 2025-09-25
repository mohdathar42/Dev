const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const port = 777;
const validator = require("validator")
const validateSignUpData = require("./utills/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/Auth");
//middleware to convert incoming req json to object
app.use(express.json());
app.use(cookieParser())

app.post("/signUp", async (req, res) => {
  try {
    //step:-1  validation of data which is coming from api's
    validateSignUpData(req);
    // step:-2 encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //create the user by using explicitly enter data never trust on req.body enter only those fields which are necessary
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    //save the data into database
    const addUser = await user.save();
    res.send(`user added successfully and the user is 
      ${addUser}`);
  } catch (err) {
    res.status(400).send("Error saving the user:     " + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    //extract the emailId and password from request body
    const { emailId, password } = req.body;

    //check email is valid or not
    if (!validator.isEmail(emailId)) {
      throw new Error("enter the valid emailId...");
    }

    //find the user in the database
    const findUser = await User.findOne({ emailId: emailId });
    if (!findUser) {
      throw new Error("Invalid Credentials");
    }
    //check the password is same or not user password and db password
    const isPasswordValid = await findUser.valdatePassword(password)
    if (isPasswordValid) {

      //creating token with expiry date
      const token = await findUser.getJWT();
      //inject the tokent into cookie
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 360000) })
      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid Creadentials");
    }
  } catch (err) {
    res.status(400).send("invailed credentials...." + err.message);
  }
});



app.get("/profile", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.loggedInUser;
    res.send(`logged in user is     ${loggedInUser}`);
  } catch (err) {
    res.status(400).send("error in profile api " + err.message)
  }
})


app.post("/connectionSend", userAuth, async (req, res) => {
  res.send("connection send successfully")
})


//connect database
connectDb()
  .then(() => {
    console.log("Database sccessfully connected.....");
    app.listen(port, () => {
      console.log(`we are listening port no  ${port}.....`);
    });
  })
  .catch((err) => {
    console.err("database cannot be connected......");
  });
