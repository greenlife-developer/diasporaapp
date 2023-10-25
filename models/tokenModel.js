const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const tokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user"
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
    }

  });

const Token = mongoose.model("Diasporal User Token", tokenSchema);
module.exports = Token;