const express = require("express");
const app = express();
const port = 777;

app.use("/test", (req, res) => {
  res.send("hi");
});
app.get("/hello", (req, res) => {
  res.send("hello bro express  yes server");
});

app.listen(port, () => {
  console.log(`we are listening port no  ${port}`);
});
