const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Cart = new Schema({
    name: { type: String, required: true,},
    image: { type: String},
    price: { type: String},
    quantity: {type:String},
    user: { type: String,required: true},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Cart', Cart);