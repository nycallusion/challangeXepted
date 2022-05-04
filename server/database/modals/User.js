const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    // phoneNumber: {
    //     type: Number,
    //     unique: true,
    // },
    name: {
        type: String,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
    },
    validated: {
        type: Boolean,
        default: false,
    },
    googleId: {
        type: String,
        unique: true,
    },
    imageUrl: {
        type: String,
    },

    timestamp: {
        type: String,
        default: () => Date.now(),
    },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);