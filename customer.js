const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Customer = require("../models/Customer");
const { body, validationResult } = require("express-validator");

//route 1 : get all customers using : get "/fetchallcustomer"
router.get("/fetchallcustomer", fetchadmin, async (req, res) => {
    try {
        const customer = await Customer.find({ admin: req.admin.id });
        res.json(customer);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
});

//route 2 : add a new customer using : post "/addcustomer"
router.post(
  "/addcustomer",
  fetchadmin,
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("phone", "phone numcer must be atlest 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    const { name, email, phone, gender } = req.body;
    //if there are error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const customer = new Customer({
        name,
        email,
        phone,
        gender,
        admin: req.admin.id,
      });
      const saveCustomer = await customer.save();
      res.json(saveCustomer);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//route 2 : updating  details for  customer using : set "/updatecustomer"

router.put("/updatecustomer/:id", fetchadmin, async(req, res) => {
  const { name, email, phone, gender } = req.body;
  try {
    const newCustomer = {};
    if (name) {
      newCustomer.name = name;
    }
    if (email) {
      newCustomer.email = email;
    }
    if (phone) {
      newCustomer.phone = phone;
    }
    if (gender) {
      newCustomer.gender = gender;
    }

    //find the customer to be updated
    let customer = await Customer.findById(req.params.id);
    if(!customer){
      return res.status(404).send("not found")
    }
    if(customer.admin.toString() !== req.admin.id){
        return res.status(404).send("not found")
    }
    customer = await Customer.findByIdAndUpdate(req.params.id, {$set: newCustomer}, {new : true})
    res.json(newCustomer)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});


//route 3 : deleting an exixting  customer using : delete "/deletecustomer"
router.delete("/deletecustomer/:id", fetchadmin, async(req, res) => {
    try {
      //find the customer to be deleted
      let customer = await Customer.findById(req.params.id);
      if(!customer){
        return res.status(404).send("not found")
      }
      if(customer.admin.toString() !== req.admin.id){
          return res.status(404).send("not found")
      }
      customer = await Customer.findByIdAndDelete(req.params.id)
      res.json({"success": "customer has been deleted", customer})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  });

module.exports = router;
