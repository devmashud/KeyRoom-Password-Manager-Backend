import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    site:{
        type: String,
        require: true,
        trim: true
    },
    username:{
        type: String,
        require: true,
        trim: true
    },
      password: {
      type: String,
      required: true
    }
}, {
    timestamps: true
  }

);

const Password = mongoose.model("Password", passwordSchema);
export default Password;