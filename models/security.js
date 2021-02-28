const mongoose = require('mongoose');
const Schema = mongoose.Schema;

9
var Security = new Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Security', Security);