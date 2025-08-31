const express = require("express");
const app = express();
const port = 777;
const { adminAuth, userAuth } = require("./middlewares/Auth");

app.use("/Admin", adminAuth);
app.get("/user", userAuth, (req, res) => {
  res.send("user added successfully  from user apis");
});

app.get("/Admin/AddUser", (req, res) => {
  res.send("user added successfully  from addmin apis");
});

app.listen(port, () => {
  console.log(`we are listening port no  ${port}`);
});
