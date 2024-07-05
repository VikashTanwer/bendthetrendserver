const mongoose =  require("mongoose");
const {Schema} = mongoose;

const FemaleSchema = new Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
      },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
      },
    suitLength :{
        type: Number,
        required: true
    },
    Brest:{
        type: Number,
        required:true,
    }
    , hips :{
        type: Number,
        required: true
    }
    , frontNeck :{
        type: Number,
        required: true
    }
    , backNeck :{
        type: Number,
        required: true
    }
    , bottom :{
        type: Number,
        required: true
    }
    , skirtLength :{
        type: Number,
        required: true
    }
    , blouseLength :{
        type: Number,
        required: true
    }
    , kamar :{
        type: Number,
        required: true
    }
    , sleeve :{
        type: Number,
        required: true
    }
    , wrist :{
        type: Number,
        required: true
    }
    , trouserLength :{
        type: Number,
        required: true
    }
    , elbow :{
        type: Number,
        required: true
    }
    , sholder :{
        type: Number,
        required: true
    }
    , dressesLength :{
        type: Number,
        required: true
    }
    , description :{
        type: Number,
    }
    , date :{
        type: Date,
        default: Date.now
    }
})

const Female = mongoose.model("Female", FemaleSchema);
// User.createIndexes();

module.exports = Female;