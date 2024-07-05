const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "vikashtanwer";
const fetchadmin = require("../middleware/fetchadmin")

// route: 1 create a user using: POST "/api/auth/createadmin". no login required
router.post(
  "/createadmin",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be atlest 5 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //if there are error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether email already exist
    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res
          .status(400)
          .json({ error: "sorry a admin with this email is already exists" });
      }

      //createing hashcode with salt for password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      //   .then((admin) => res.json(admin))
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({ error: "please enter a unique value", message: err.message });
      //   });
      // const admin = Admin(req.body);
      // admin.save();
      // res.send(req.body);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error ocure");
    }
  }
);

//route: 2 authentication a admin using: post "api/auth/login". no login required

router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ error: "sorry admin does not exists" });
      }
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "plese enter correct password" });
      }
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// route: 3 get loggedin admin detail using: post "api/auth/getuser". login required

router.post("/getadmin", fetchadmin, async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  try {
    const adminid = req.admin.id;
    const admin = await Admin.findById(adminid).select("-password");
    res.send(admin)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
