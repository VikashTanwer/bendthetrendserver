const express = require("express");
const router = express.Router();
const fetchadmin = require("../middleware/fetchadmin");
const Female = require("../models/Female");
const { body, validationResult } = require("express-validator");

//route 1 : get all males data using : get "/fetchmale"
router.get("/fetchfemale", fetchadmin, async (req, res) => {
  try {
    const female = await Female.find({ admin: req.admin.id });
    res.json(female);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

//route 2 : add a new male data using : post "/addfemale" login required
router.post(
  "/addfemale",
  fetchadmin,
  [
    body("dressesLength", "enter a value").exists(),
    body("sholder", "enter a value").exists(),
    body("elbow", "enter a value").exists(),
    body("trouserLength", "enter a value").exists(),
    body("wrist", "enter a value").exists(),
    body("sleeve", "enter a value").exists(),
    body("kamar", "enter a value").exists(),
    body("blouseLength", "enter a value").exists(),
    body("skirtLength", "enter a value").exists(),
    body("bottom", "enter a value").exists(),
    body("backNeck", "enter a value").exists(),
    body("frontNeck", "enter a value").exists(),
    body("hips", "enter a value").exists(),
    body("Brest", "enter a value").exists(),
    body("suitLength", "enter a value").exists(),
    body("acrossBack", "enter a value").exists(),
  ],
  async (req, res) => {
    const {
      description,
      dressesLength,
      sholder,
      elbow,
      trouserLength,
      wrist,
      sleeve,
      kamar,
      blouseLength,
      skirtLength,
      bottom,
      backNeck,
      frontNeck,
      hips,
      Brest,
      suitLength,
      acrossBack
    } = req.body;
    //if there are error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const female = new Female({
        description,
        dressesLength,
        sholder,
        elbow,
        trouserLength,
        wrist,
        sleeve,
        kamar,
        blouseLength,
        skirtLength,
        bottom,
        backNeck,
        frontNeck,
        hips,
        Brest,
        suitLength,
        acrossBack,
        admin: req.admin.id
      });
      const savefeMale = await female.save();
      res.json(savefeMale);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//route 3 : updating a existing male data using : put "/updatefemale" login required
router.put("/updatefemale/:id", fetchadmin, async (req, res) => {
    const {
        description,
        dressesLength,
        sholder,
        elbow,
        trouserLength,
        wrist,
        sleeve,
        kamar,
        blouseLength,
        skirtLength,
        bottom,
        backNeck,
        frontNeck,
        hips,
        Brest,
        suitLength,
        acrossBack
      } = req.body;
  //if there are error return bad request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newFemale = {};
    if (acrossBack) {
      newFemale.acrossBack = acrossBack;
    }
    if (suitLength) {
      newFemale.suitLength = suitLength;
    }
    if (Brest) {
      newFemale.Brest = Brest;
    }
    if (hips) {
      newFemale.hips = hips;
    }
    if (description) {
      newFemale.description = description;
    }
    if (frontNeck) {
      newFemale.frontNeck = frontNeck;
    }
    if (backNeck) {
      newFemale.backNeck = backNeck;
    }
    if (bottom) {
      newFemale.bottom = bottom;
    }
    if (skirtLength) {
      newFemale.skirtLength = skirtLength;
    }
    if (blouseLength) {
      newFemale.blouseLength = blouseLength;
    }
    if (kamar) {
      newFemale.kamar = kamar;
    }
    if (sleeve) {
      newFemale.sleeve = sleeve;
    }
    if (wrist) {
      newFemale.wrist = wrist;
    }
    if (trouserLength) {
      newFemale.trouserLength = trouserLength;
    }
    if (elbow) {
      newFemale.elbow = elbow;
    }
    if (sholder) {
      newFemale.sholder = sholder;
    }
    if (dressesLength) {
      newFemale.dressesLength = dressesLength;
    }
    let female = await Female.findById(req.params.id);
    if (!female) {
      return res.status(404).send("id not found");
    }
    if (female.admin.toString() !== req.admin.id) {
      return res.status(404).send("not found");
    }
    female = await Female.findByIdAndUpdate(
      req.params.id,
      { $set: newFemale },
      { new: true }
    );
    res.json(newFemale);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

//route 3 : deleting an exixting  female using : delete "/deletefemale"
router.delete("/deletefemale/:id", fetchadmin, async (req, res) => {
  try {
    //find the customer to be deleted
    let female = await Female.findById(req.params.id);
    if (!female) {
      return res.status(404).send("not found");
    }
    if (female.admin.toString() !== req.admin.id) {
      return res.status(404).send("not found");
    }
    female = await Female.findByIdAndDelete(req.params.id);
    res.json({ success: "customer has been deleted", female });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
