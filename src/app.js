const express = require("express");
const app = express();
const port = 777;

 
app.get("/user", (req, res) => {
  res.send({firstname:"mohd",lastname:"athar" ,class:"mca"});
});
 
app.post("/user", (req, res) => { 
console.log("hello");

  res.send( "data succesfully saved in the database");
});
 
app.delete("/user", (req, res) => {
  res.send( "user successfully delete from the db")
});

app.listen(port, () => {
  console.log(`we are listening port no  ${port}`);
});
