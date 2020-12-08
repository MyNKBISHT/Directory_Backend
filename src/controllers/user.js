const User = require("../models/userDetails");

//GetAllDetails
exports.getDetails = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  User.find({}).exec((error, data) => {
    if (error) {
      return res.status(400).json({
        error
      });
    } else {
      res.status(201).json({
        data
      });
    }
  });
};

//Create
exports.addUser = (req, res) => {
  const { username, address, contact, email } = req.body;
  console.log(username, address, contact, email);
  const user = new User({
    username,
    address,
    contact,
    email
  });

  user.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "something went wrong"
      });
    } else {
      return res.status(201).json({
        data
      });
    }
  });
};

//Update
exports.editUser = async (req, res) => {
  try {
    const { username, address, contact, email } = req.body;
    var hero = {
      username: username,
      address: address,
      contact: contact,
      email: email
    };
    console.log(hero);
    console.log(req.params.id);
    const updateDetail = await User.updateMany({ _id: req.params.id }, hero);
    res.status(200).json({
      updateDetail
    });
  } catch (error) {
    res.json({ error });
  }
};

//Delete
exports.deleteUser = async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      removedUser
    });
  } catch (error) {
    res.json({ error });
  }
};
