import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a E-mail"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a Password"],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordExpires: Date,
  verifyToken: String,
  verifyTokenExpires: Date,

})

const User = mongoose.models.User || mongoose.model(
  "User", userSchema
)

export default User