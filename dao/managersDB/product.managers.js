import { productModel } from "../models/product.model.js";

class ProductManager {
    async findAll(options = {}) {
        try {
            const { limit = 10, page = 1, sort, query } = options;
            const searchOptions = {};
            if (query) {
                searchOptions.category = query;
            }
            const products = await productModel
                .find(searchOptions)
                .limit(parseInt(limit))
                .skip((parseInt(page) - 1) * parseInt(limit))
                .sort(sort)
                .exec();

            return products;
        } catch (error) {
            throw error;
        }
    }

    async createOne(obj) {
        try {
            const response = await productModel.create(obj);
            return response;
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async findOneById(productId) {
        try {
            const product = await productModel.findById(productId);
            return product;
        } catch (error) {
            throw new Error(`Error fetching product by ID: ${error.message}`);
        }
    }
}

export const productManager = new ProductManager();
