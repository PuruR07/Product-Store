import Product from "../Model/Product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, products});
    } catch (error) {
        log.error("Error in fetching products: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};

export const createProduct = async (req, res)=>{
    const product = req.body;//* The user will send the data in the body of the request

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please fill all the fields"});
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct, message:"New Product Created"})
    } catch (error) {
        console.log("Error in creating product: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
};

export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Product Deleted"})
    } catch (error) {
        console.log("Error in deleting product: ", error.message);
        
        res.status(500).json({success:false, message:"Internal Server Error"})
    }
};


export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Product ID"});
    }

    try {
       const updatedProduct =  await Product.findByIdAndUpdate(id, product, {new:true});
       res.status(200).json({success:true, message:"Product Updated", product:updatedProduct})
    } catch (error) {
        res.status(500).json({success:false, message:"Internal Server Error"})

    }
};