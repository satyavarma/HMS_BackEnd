const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');
const Schema = mongoose.Schema;

var StudentsIn = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    inDetails:{
        type:String,
        required: true
    },
    treatedBy:{
        type: String,
    },
    dConf:{
        type: Boolean
    },
    prescription:{
        type: String,
    },
    pConf:{
        type: Boolean
    }
},{
    timestamps: true
});

module.exports = mongoose.model('StudentsIn',StudentsIn);