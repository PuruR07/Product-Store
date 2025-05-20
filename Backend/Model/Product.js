import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
},
{
    timestamps: true // This will add createdAt and updatedAt fields to the schema   
});

const Product = mongoose.model('Product', productSchema);//* Here Product is the name of the collection in the database and productSchema is the blueprint/schema we created above

export default Product;