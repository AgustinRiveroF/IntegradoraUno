import { Router } from "express";
import { productManager } from "../dao/managersDB/product.managers.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const { limit = 10, page = 1, sort, query } = req.query || {};
      const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort,
        query,
      };
  
      let products;
  
      if (sort === "asc") {
        products = await productManager.findAllSortedAscending(options);
      } else if (sort === "desc") {
        products = await productManager.findAllSortedDescending(options);
      } else {
        products = await productManager.findAll(options);
      }
  
      const totalProducts = products.length;
      const totalPages = totalProducts > 0 ? Math.ceil(totalProducts / limit) : 1;
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}` : null;
      const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}` : null;
  
      res.render('products', { products }); ({
        status: "success",
        payload: products,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: page,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink,
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
  
router.get("/:pid", async (req, res) => {  
    try {
        const { pid } = req.params;
        const product = await productManager.findOneById(pid);

        if (!product) {
            return res.status(404).json({ status: "error", message: "Product not found" });
        }

        res.render("productDetails", { product: product.toObject() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: error.message });
    }
});

// ------------------------------------------ POST -----------------------------------------

router.post("/", async(req, res) => { 
    try {
        const createProduct = await productManager.createOne(req.body)
        res.status(200).json({ message: "Product created", product: createProduct});
    }catch (error) {
        res.status(500).json({ message: error.message});
    }
})


export default router;
