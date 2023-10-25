import { productModel } from "../models/product.model.js";

class ProductManager {
    async findAll() {
        const response = await productModel.find();
        return response;
    }

    async createOne(obj){
        const response = await productModel.create(obj);
        return response;
    }
}

export const productManager = new ProductManager();