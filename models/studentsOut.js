const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');
const Schema = mongoose.Schema;

var StudentsOut = new Schema({
    id:{
        type: String,
        required: true,
    },
    inDetails:{
        type:String,
        required: true
    },
    outDetails:{
        type: String,
        require: true
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

module.exports = mongoose.model('StudentsOut',StudentsOut);