const mongoose = require("mongoose");
const ServiceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true
    },
    serviceManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
