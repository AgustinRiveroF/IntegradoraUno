import { Router } from "express";
import { productManager } from "../dao/managersDB/product.managers.js";

const router = Router();

router.get("/", async(req, res) =>{
    try {
        const products = await productManager.findAll()
        res.status(200).json({ message: "Products", products})
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
});

router.post("/", async(req, res) => {
    try {
        const createProduct = await productManager.createOne(req.body)
        res.status(200).json({ message: "Product created", product: createProduct});
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
})

export default router