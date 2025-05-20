import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../Controller/product.controller.js";

const router = express.Router();

//* These endpoints will be prefixed with /api/products
router.get("/", getProducts)
router.post("/", createProduct)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)


export default router;