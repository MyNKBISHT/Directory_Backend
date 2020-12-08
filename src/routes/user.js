const express = require("express");
const {
  addUser,
  editUser,
  getDetails,
  deleteUser
} = require("../controllers/user");

const router = express.Router();
// router.get("/adduser", getDetails);

router.get("/", getDetails);
router.post("/adduser", addUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
