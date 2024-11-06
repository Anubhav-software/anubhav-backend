import mongoose from 'mongoose';  

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  panImages: [{ type: String, required: true }], 
  aadharNumber: { type: String, required: true },
  aadharImages: [{ type: String, required: true }], 
  isVerified: { type: Boolean, default: false },
});


export default mongoose.model("User", userSchema);
