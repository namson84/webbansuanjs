const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: { type: String, requried:true },
    fullname: { type: String, maxLength: 50, requried:true },
    phone: { type: String, requried:true },
    address: { type: String, requried:true },
    gender : { type: String, requried:true},
    type: { type: String,default:false },
    password: { type: String, minLength:6, maxLength: 16, requried:true },
},{
    timestamps: true,
});

module.exports = mongoose.model('User', User);