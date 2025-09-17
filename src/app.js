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
    const addUser = await user.save();
    res.send(`user added successfully and the user is 
      ${addUser}`);
  } catch (err) {
    res.status(400).send("error saving the user:     " + err.message);
  }
});

app.get("/getOneUser", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    //get one user from db
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("something went wrong");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(" error in get all user api " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    //get all user from db
    const allUsers = await User.find({});
    if (allUsers.length === 0) {
      res.status(404).send("there is no user in the db");
    } else {
      res.send(allUsers);
    }
  }catch (err) {
    res.status(400).send(" error in get all user api " + err.message);
  }
});

app.delete("/deleteUser", async (req, res) => {
     const userId = req.body.userId;
  try {
  
    //delete a user from db
    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      res.status(404).send(`there is no user in the db to delete " ${userId} "  `);
    } else {
      res.send("user delete successfully"+deleteUser);
    }
  } catch (err) {
    res.status(400).send(" error in get delete user api " + err.message);
  }
});



app.patch("/updateUser",async(req,res)=>{
  const userId=req.body.userId;
  const data=req.body;
  try{
const user=await User.findByIdAndUpdate({_id:userId},data,{runValidators:true})
res.send(`user update successfully   ${user}`)
  }catch(err){
    res.status(400).send("UPDATE FAILED   "+err.message)
  }
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
