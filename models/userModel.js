const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
      default: "title"
    },
    surname: {
      type: String,
      required: [true, "Please add title"],
    },
    otherNames: {
      type: String,
      required: [true, "Please add your other names"],
    },
    maritalStatus: {
      type: String,
      required: [true, "Please add your marital status"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid emaial",
      ],
    },
    occupation: {
      type: String,
      required: [true, "Please add your occupation"],
    },
    dob: {
      type: String,
      required: [true, "Please add your date of birth"],
    },
    gender: {
      type: String,
      required: [true, "Please add your gender"],
    },
    religion: {
      type: String,
      required: [true, "Please add your religion"],
    },
    nextOfKin: {
      type: String,
      required: [true, "Please add your next of kin"],
    },
    residentialAddress: {
      type: String,
      required: [true, "Please add your address"],
    },
    localGovernmentArea: {
      type: String,
      required: [true, "Please add your address"],
    },
    country: {
      type: String,
      required: [true, "Please add a your country"],
    },
    yearOfTravel: {
      type: String,
      required: [true, "Please add a your country"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be up to 6 characters"],
      //   maxLength: [23, "Password must not be more than 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    assetType: {
      type: String,
      required: [true, "Please add an asset"],
    },
    businessName: {
      type: String,
      required: [true, "Please add a Business Name"],
    },
    businessAddress: {
      type: String,
      required: [true, "Please add a Business Address"],
    },
    phone: {
      type: String,
      default: "+234",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must not be more than 250 characters"],
      default: "bio",
    },
  },
  {
    timestamps: true,
  }
);

//   Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("DiasporaUser", userSchema);
module.exports = User;