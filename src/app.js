const express = require("express");
const app = express();
const port = 777;

app.use(
  "/user",
  (req, res, next) => {
    // res.send("route handler  eq 1"); 
    next();
  },
  (req, res) => {
    res.send("route handler e2");
  }
);


app.listen(port, () => {
  console.log(`we are listening port no  ${port}`);
});
