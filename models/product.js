const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const productSchema =new Schema({
    title : {type:String ,required:true},
    description:{type:String},
    price :{type :Number,required:true},
    category:{type:String ,required :true},
    images:{type:Array},
    owner:{type:String},
    stock:{type:Number,required :true},
    published:{type:Boolean,required :true},
    createdAt :{ type: Date, default: Date.now },
});

const Products =  mongoose.model('Product',productSchema);
 module.exports = Products;