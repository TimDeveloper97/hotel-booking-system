import mongoose from "mongoose";
import { INTEGER } from "../constants/constants.js";

const UserSchema = mongoose.Schema({
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true },
  full_name: { type: String, trim: true, required: true },
  phone: { type: String, trim: true },
  banned: { type: Boolean, default: false },
  role: { type: Number, default: INTEGER.CUSTOMER_ROLE },
  created_date: { type: Date, default: new Date() },
  modified_date: { type: Date, default: new Date() },
});

export default mongoose.model("User", UserSchema);
