import { prisma } from "@/components/lib/prisma";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
  
    let cart = await prisma.cart.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  
    let subtotal = 0;
    let taxAmount = 0;
  
    if (cart && cart.cartItems) {
      cart.cartItems.forEach((item) => {
        console.log("ITEM ________________________", item);
        const itemSubtotal = item.product.price * item.quantity;
        const itemTaxAmount = itemSubtotal * (item.product.category.tax);
  
        subtotal += itemSubtotal;
        taxAmount += itemTaxAmount;
      });
    }
  
    const total = subtotal + taxAmount;
    
    cart = await prisma.cart.update({
      where: { id: Number(id) },
      data: {
        subtotal,
        taxAmount,
        total,
      },
      include: {
        cartItems: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
  
    return new Response(JSON.stringify(cart));
  }
  

export async function POST() {
  const cart = await prisma.cart.create({
    data: {
      subtotal: 0,
      taxAmount: 0,
      total: 0,
    },
  });

  return new Response(JSON.stringify(cart));
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
  
    // Delete all cart items associated with the cart first
    await prisma.cartItem.deleteMany({
      where: {
        cartId: Number(id),
      },
    });
  
    // Then delete the cart itself
    const cart = await prisma.cart.delete({
      where: {
        id: Number(id),
      },
    })
    
    return new Response(JSON.stringify(cart));
  }
  