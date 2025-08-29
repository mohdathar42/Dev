const express = require("express");
const app = express();
const port = 777;

 
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params)
  res.send({firstname:"mohd",lastname:"athar" ,class:"mca"});
});
 
 
app.listen(port, () => {
  console.log(`we are listening port no  ${port}`);
});
