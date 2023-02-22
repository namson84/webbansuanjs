const mongoose = require('mongoose');

const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    name: { type: String, required: true,},
    description: { type: String},
    image: { type: String},
    price: { type: String},
    type: {type:String},
    position:{type:Boolean}
    
},{
    timestamps: true,
});

Course.plugin(mongooseDelete, { 
    overrideMethods: 'all',
    deletedAt: true, 
});

module.exports = mongoose.model('Course', Course);
