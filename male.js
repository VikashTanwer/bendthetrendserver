const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Male = require("../models/Male");
const { body, validationResult } = require("express-validator");

//route 1 : get all males data using : get "/fetchmale"
router.get("/fetchmale", fetchadmin, async (req, res) => {
    try {
        const male = await Male.find({ customer: req.admin.id });
        res.json(male);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
    }
});


//route 2 : add a new male data using : post "/addmale" login required
router.post(
    "/addmale",
    fetchadmin,
    [
      body("neck", "enter a value").exists(),
      body("waistKnee", "enter a value").exists(),
      body("crotchLength", "enter a value").exists(),
      body("trouserLength", "enter a value").exists(),
      body("ankle", "enter a value").exists(),
      body("knee", "enter a value").exists(),
      body("thigh", "enter a value").exists(),
      body("shirtLength", "enter a value").exists(),
      body("hip", "enter a value").exists(),
      body("bicep", "enter a value").exists(),
      body("chest", "enter a value").exists(),
      body("wrist", "enter a value").exists(),
      body("aroundArm", "enter a value").exists(),
      body("sleeveLength", "enter a value").exists(),
      body("sholderWidth", "enter a value").exists(),
      body("acrossBack", "enter a value").exists(),
      
    ],
    async (req, res) => {
      const { neck,description,waistKnee,trouserLength , crotchLength,ankle,knee,thigh,shirtLength,hip,bicep, chest,wrist, aroundArm,sholderWidth,acrossBack, sleeveLength} = req.body;
      //if there are error return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const male = new Male({
            neck,
            acrossBack,
            sholderWidth,
            sleeveLength,
            aroundArm,
            wrist,
            chest,
            bicep,
            hip,
            shirtLength,
            thigh,
            knee,
            ankle,
            crotchLength,
            trouserLength,
            waistKnee,
            description,
          customer: req.admin.id,
        });
        const saveMale = await male.save();
        res.json(saveMale);
      } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
      }
    }
  );

  //route 3 : updating a existing male data using : put "/updatemale" login required
router.put(
    "/updatemale/:id",
    fetchadmin,
    async (req, res) => {
      const { neck,description,waistKnee,trouserLength , crotchLength,ankle,knee,thigh,shirtLength,hip,bicep, chest,wrist, aroundArm,sholderWidth,acrossBack, sleeveLength} = req.body;
      //if there are error return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const newMale = {};
        if (ankle) {
          newMale.ankle = ankle;
        }
        if (crotchLength) {
          newMale.crotchLength = crotchLength;
        }
        if (trouserLength) {
          newMale.trouserLength = trouserLength;
        }
        if (waistKnee) {
          newMale.waistKnee = waistKnee;
        }
        if (description) {
          newMale.description = description;
        }
        if (knee) {
          newMale.knee = knee;
        }
        if (thigh) {
          newMale.thigh = thigh;
        }
        if (shirtLength) {
          newMale.shirtLength = shirtLength;
        }
        if (hip) {
          newMale.hip = hip;
        }
        if (bicep) {
          newMale.bicep = bicep;
        }
        if (chest) {
          newMale.chest = chest;
        }
        if (wrist) {
          newMale.wrist = wrist;
        }
        if (aroundArm) {
          newMale.aroundArm = aroundArm;
        }
        if (sleeveLength) {
          newMale.sleeveLength = sleeveLength;
        }
        if (sholderWidth) {
          newMale.sholderWidth = sholderWidth;
        }
        if (acrossBack) {
          newMale.acrossBack = acrossBack;
        }
        if (neck) {
          newMale.neck = neck;
        }
        let male = await Male.findById(req.params.id);
        if(!male){
          return res.status(404).send("id not found")
        }
        if(male.customer.toString() !== req.admin.id){
            return res.status(404).send("not found")
        }
        male = await Male.findByIdAndUpdate(req.params.id, {$set: newMale}, {new : true})
        res.json(newMale)
      } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error");
      }
    }
  );


  //route 3 : deleting an exixting  male using : delete "/deletemale"
router.delete("/deletemale/:id", fetchadmin, async(req, res) => {
    try {
      //find the customer to be deleted
      let male = await Male.findById(req.params.id);
      if(!male){
        return res.status(404).send("not found")
      }
      if(male.customer.toString() !== req.admin.id){
          return res.status(404).send("not found")
      }
      male = await Male.findByIdAndDelete(req.params.id)
      res.json({"success": "customer has been deleted", male})
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  });

module.exports  = router;