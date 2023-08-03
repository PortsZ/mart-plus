import axios from "axios";


export async function getCartById(id: number) {
    const cart = await axios.get(`/api/cart?id=${id}`);
    return cart.data;
}

export async function createCart() {
    const newCart = await axios.post("/api/cart");
    return newCart.data;
}

export async function deleteCart(id: number) {
    const deletedCart = await axios.delete(`/api/cart?id=${id}`);
    return deletedCart.data;
}

