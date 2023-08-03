interface Cart {

    id?: number;
    createdAt?: string;
    subtotal?: number;
    taxAmount?: number;
    total?: number;
    cartItems?: CartItem[];
  }
  
  interface CartItem {
  
  
    id?: number;
    quantity?: number;
    cart?: Cart;
    cartId?: number;
    product?: Product;
    productId?: number;
  }
  
  interface Category {
      id?: number;
      tax?: number;
      name?: string;
      products?: Product[];
  }
  
  interface Product {
      id?: number;
      name?: string;
      price?: number;
      category?: Category;
      categoryId?: number;
      cartItems?: CartItem[];
  }
  