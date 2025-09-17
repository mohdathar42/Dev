const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
       required:true,
      lowercase:true,
      trim:true,
      minLength: 4,
    },
    lastName: {
      type: String,
      required:true,
      lowercase:true,
      trim:true,
      minLength:4
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max:50
    },
    gender: {
      type: String,
      //custom validation function
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.un.org/pga/wp-content/uploads/sites/53/2018/09/Dummy-image-1.jpg",
    },
    about: {
      type: String,
      default: "this is nthe description of user",
    },
    skills: {
      type: [String],
      default: ["javascript", "node js", "python"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
