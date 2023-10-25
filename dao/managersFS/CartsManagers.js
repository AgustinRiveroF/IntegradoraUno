import { cartsModel } from "../models/cart.models.js";

class CartsManager {
  async createCart() {
    const newCart = { products: [] };
    const response = await cartsModel.create(newCart);
    return response;
  }

  async findCartById(idCart) {
    const response = await cartsModel.findById(idCart);
  }

  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);
    // cart = {_Id:jfjgjg,products:[]}
    const productIndex = cart.products.findIndex(
      (p) => p.product === idProduct
    );
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    return cart.save();
  }
}

export const cartsManager = new CartsManager();