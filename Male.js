const mongoose =  require("mongoose");
const {Schema} = mongoose;

const maleSchema = new Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
      },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
      },
    neck :{
        type: Number,
        required: true
    },
    acrossBack:{
        type: Number,
        required:true,
    }
    , sholderWidth :{
        type: Number,
        required: true
    }
    , sleeveLength :{
        type: Number,
        required: true
    }
    , aroundArm :{
        type: Number,
        required: true
    }
    , wrist :{
        type: Number,
        required: true
    }
    , chest :{
        type: Number,
        required: true
    }
    , bicep :{
        type: Number,
        required: true
    }
    , hip :{
        type: Number,
        required: true
    }
    , shirtLength :{
        type: Number,
        required: true
    }
    , thigh :{
        type: Number,
        required: true
    }
    , knee :{
        type: Number,
        required: true
    }
    , ankle :{
        type: Number,
        required: true
    }
    , crotchLength :{
        type: Number,
        required: true
    }
    , trouserLength :{
        type: Number,
        required: true
    }
    , waistKnee :{
        type: Number,
        required: true
    }
    , description :{
        type: String,
    }
    , date :{
        type: Date,
        default: Date.now
    }
})

const male = mongoose.model("male", maleSchema);
// User.createIndexes();

module.exports = male;
