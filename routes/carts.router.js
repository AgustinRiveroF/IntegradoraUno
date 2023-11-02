import { Router } from "express";
import { cartsModel } from "../dao/models/cart.models.js";
import { cartsManager } from "../dao/managersFS/CartsManagers.js"; 

const router = Router();

// -------------------------------------- GET ------------------------------------------

router.get("/notpopulated/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.findCartById(cid);

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    res.render("carts", { cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  const cart = cartsManager.findCartById(idCart);
  res.json({ cart });
});

router.get('/', async (req, res) => {
  try {
    const carts = await cartsManager.getAllCarts();
    res.json({ status: 'success', carts });
  } catch (error) {
    console.error('Error getting carts:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

router.get("/populated/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsModel.findById(cid).populate({
      path: "products.product",
      model: "Product",
    });

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    res.render("carts", { cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

//------------------------------------- POST -------------------------------------------

router.post("/", async (req, res) => {
  const cart = await cartsManager.createCart();
  res.json({ cart });
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
      const { cid, pid } = req.params;

      // Busca el carrito por ID
      const cart = await cartsModel.findById(cid);

      // Busca el producto por ID
      const product = await productsModel.findById(pid);

      if (!cart || !product) {
          return res.status(404).json({ status: "error", message: "Cart or product not found" });
      }

      // Agrega el producto al carrito
      cart.products.push({ product: product._id, quantity: 1 });

      // Guarda el carrito actualizado
      await cart.save();

      res.status(200).json({ status: "success", message: "Product added to cart" });
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
});


//------------------------------------- PUT ----------------------------------------

router.put("/:cid", async (req, res) => {
  const cartId = req.params.cid; 
  const updatedCart = req.body;

  try {
    const result = await cartsManager.updateCart(cartId, updatedCart);
    res.json({ status: "success", updatedCart: result });
  } catch (error) {
    res.status(500).json({ status: "error", message: `Error updating cart: ${error.message}` });
  }
});


router.put("/:cid/products/:pid", async (req, res) => {
  try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      await cartsManager.updateProductQuantity(cid, pid, quantity);
      res.status(200).json({ status: "success", message: "Product quantity updated" });
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
});


// ---------------------------------------- DELETE ----------------------------------- 

router.delete("/:cid", async (req, res) => {
  try {
      const { cid } = req.params;
      await cartsManager.clearCart(cid);
      res.status(200).json({ status: "success", message: "Cart cleared" });
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
});


router.delete("/:cid/products/:pid", async (req, res) => {
  try {
      const { cid, pid } = req.params;
      await cartsManager.removeProductFromCart(cid, pid);
      res.status(200).json({ status: "success", message: "Product removed from cart" });
  } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
  }
});


export default router;