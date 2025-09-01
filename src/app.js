const express = require("express");
const app = express();
const connectDb = require("./config/database");
const User = require("./models/user");
const port = 777;

//middleware to convert incoming req json to object
app.use(express.json());

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    //save the data into database
     await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error saving the user" + err.message);
  }
});

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
