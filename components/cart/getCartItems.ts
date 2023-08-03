import axios from "axios";

export async function getCartItems(id: number) {
    const cartItems = await axios.get(`/api/cartItems?id=${id}`);
    return cartItems.data;
}

export async function createCartItem(cartItem: CartItem) {
    const newCartItem = await axios.post("/api/cartItems", cartItem);
    return newCartItem.data;
}

export async function updateCartItem(cartItem: CartItem) {
    const updatedCartItem = await axios.put("/api/cartItems", cartItem);
    return updatedCartItem.data;
}

export async function deleteCartItem(id: number) {
    const deletedCartItem = await axios.delete(`/api/cartItems?id=${id}`);
    return deletedCartItem.data;
}