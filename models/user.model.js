const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    matricule: { type: String, requ: true, unique: true },
    role: { type: Number, required: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    profileImage: {
      type: String,
      required: true,
      default:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
