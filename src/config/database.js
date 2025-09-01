 const mongoose = require("mongoose");
const connectDb = async () =>  {
  await mongoose.connect(
    "mongodb+srv://matharkhan732_db_user:TV18CZNzwC5vn2XA@studentdata.mwbeg6l.mongodb.net/student"
  );
};
 module.exports=connectDb;