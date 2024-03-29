const User = require("../models/users");
const uuid = require("uuid");
const asyncHandler = require("../middleware/async");

//desc      Register new user
//route     POST /api/v1/auth/register
//accesss   Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const apiKey = uuid.v4();

  const user = await User.create({
    name,
    password,
    email,
    apiKey,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});

//desc      Login  user
//route     POST /api/v1/auth/login
//accesss   Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password} = req.body;

  if (!email || !password) {
    return next("email or password is wrong");
  }             

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return next("not found email");
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(" wrong password");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});
//desc      Get All user  user
//route     POST /api/v1/auth/getAllusers
//accesss   Public

exports.getAllUsers = asyncHandler(async(req, res, next)=>{
  const users = await User.find()
  res.status(200).json({
    success: true,
    data: users,
  });
})
