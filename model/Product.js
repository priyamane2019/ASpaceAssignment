const mongooose = require("mongoose");
const ProductSchema = new mongooose.Schema({
    name:{
        type:String,
        required:true
    },
    

})
const Product = mongooose.model("Product", ProductSchema);
module.exports = Product;