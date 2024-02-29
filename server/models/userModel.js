import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, unique: true },
  password: { type: String, require: true },
});

export const UserModel = mongoose.model("User", userSchema);
