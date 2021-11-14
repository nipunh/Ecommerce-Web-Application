const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        trim: true,
        required : true,
        maxlength : 48,
    },

    description:{
        type : String,
        trim: true,
        required : true,
    },
    price :{
        type : Number,
        required : true,
        maxlength: 32,
        trim : true
    },

    category :{
        type: ObjectId,
        ref : "Category",
        required : true,
    },

    stock:{
        type: Number,
    },

    sold:{
        type: Number,
        default : 0,
    },

    photo :{
        data: Buffer,
        contentType : String,
    }

})

module.exports = mongoose.model("Product", productSchema)