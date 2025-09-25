const mongoose = require("mongoose");
const validator=require("validator")
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
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error(`please enter a valid emailId  ${value}`)
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error(`please enter a strong password.....   "${value}"`)
        }
      }
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
        validate(value){
          if(!validator.isURL(value)){
            throw new Error("please enter a valid url"+value)
          }
        }
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
userSchema.methods.getJWT = async function () {
  const findUser = this;
  const token = await jwt.sign({ _id: findUser._id }, "atharKhan@123", {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const findUser = this;
  const passwordHash = findUser.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
