const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = asyncHandler(async (req, res) => {
  const {
    surname,
    otherNames,
    maritalStatus,
    email,
    occupation,
    dob,
    gender,
    religion,
    nextOfKin,
    residentialAddress,
    localGovernmentArea,
    country,
    yearOfTravel,
    password,
    assetType,
    businessName,
    businessAddress,
    phone,
  } = req.body;

  // Validation
  if (
    !surname ||
    !otherNames ||
    !maritalStatus ||
    !email ||
    !occupation ||
    !dob ||
    !gender ||
    !religion ||
    !nextOfKin ||
    !residentialAddress ||
    !localGovernmentArea ||
    !country ||
    !yearOfTravel ||
    !password ||
    !assetType ||
    !businessName ||
    !businessAddress ||
    !phone
  ) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Check that email is not already used
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email has already been used");
  }

  // Create a new user

  const user = await User.create({
    surname,
    otherNames,
    maritalStatus,
    email,
    occupation,
    dob,
    gender,
    religion,
    nextOfKin,
    residentialAddress,
    localGovernmentArea,
    country,
    yearOfTravel,
    password,
    assetType,
    businessName,
    businessAddress,
    phone,
  });

  // Generate token
  const token = generateToken(user._id);

  // Send HTTP-Only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expiresIn: new Date(Date.now() * 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const {
      _id,
      title,
      otherNames,
      maritalStatus,
      email,
      occupation,
      dob,
      gender,
      religion,
      nextOfKin,
      residentialAddress,
      localGovernmentArea,
      country,
      yearOfTravel,
      photo,
      phone,
      assetType,
      businessName,
      businessAddress,
      bio,
    } = user;
    res.status(201).json({
      _id,
      title,
      otherNames,
      maritalStatus,
      email,
      occupation,
      key: _id,
      dob,
      gender,
      religion,
      nextOfKin,
      residentialAddress,
      localGovernmentArea,
      country,
      yearOfTravel,
      photo,
      assetType,
      businessName,
      businessAddress,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }

});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email and password");
  }

  // Check that there is a user
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found, Please sign up");
  }

  // Compare user passwords
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Send HTTP-Only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expiresIn: new Date(Date.now() * 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }

  if (user && passwordIsCorrect) {
    const { _id, name, email, phone, photo, bio } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      photo,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// logout
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expiresIn: new Date(0),
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({
    message: "Successfully logged out",
  });
});

// Get user Data
const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const {
      _id,
      title,
      otherNames,
      maritalStatus,
      email,
      occupation,
      dob,
      gender,
      religion,
      nextOfKin,
      residentialAddress,
      localGovernmentArea,
      country,
      yearOfTravel,
      photo,
      phone,
      assetType,
      businessName,
      businessAddress,
      bio,
    } = user;
    res.status(200).json({
      _id,
      title,
      otherNames,
      maritalStatus,
      key: _id,
      email,
      occupation,
      dob,
      gender,
      religion,
      nextOfKin,
      residentialAddress,
      localGovernmentArea,
      country,
      yearOfTravel,
      photo,
      phone,
      assetType,
      businessName,
      businessAddress,
      bio,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).sort("-createdAt");
  res.status(200).json(users);
});

const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.json(false);
  }

  // Verify token
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    res.status(200).json(true);
  }
  res.json(false);
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email, phone, photo, bio } = user;
    user.email = email;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      photo: updatedUser.photo,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User Not Found, please signup");
  }

  if (!oldPassword || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check that old password is correct
  const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (user && passwordIsCorrect) {
    user.password = password;
    await user.save();
    res.status(200).send("Password saved successfully");
  } else {
    res.status(400);
    throw new Error("Old password is Incorrect");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await Token.deleteOne();
  }

  // create reset token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;

  console.log(resetToken);

  // Hash before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // save token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30 minutes
  }).save();

  // construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

  // Reset Email
  const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>  
        <p>This reset link is valid for only 30minutes.</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p>Regards...</p>
        <p>GNLIFE Team</p>
    `;

  const subject = "Password reset request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({
      success: true,
      message: "Reset Email Sent",
    });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, Please try again");
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // Hash token, then compare to the token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: {
      $gt: Date.now(),
    },
  });

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or expired token ");
  }

  // Find user
  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;

  await user.save();
  res.status(200).json({
    message: "Password reset successful",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getUserData,
  getAllUsers,
  loginStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
};
