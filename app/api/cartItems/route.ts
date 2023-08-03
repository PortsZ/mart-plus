import { prisma } from "@/components/lib/prisma";

// Add an item to a cart
export async function POST(request: Request) {
    const body = await request.json();
  
    // Find existing cart item with the same product id
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: body.cartId,
        productId: body.productId,
      },
    });
  
    let cartItem;
    if (existingCartItem) {
      // If it exists, update the quantity
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + body.quantity,
        },
        include: {
          product: {
            include: {
              category: true
            }
          },
        }
      });
    } else {
      // If it doesn't exist, create a new one
      cartItem = await prisma.cartItem.create({
        data: {
          quantity: body.quantity,
          cartId: body.cartId,
          productId: body.productId,
        },
        include: {
          product: {
            include: {
              category: true
            }
          },
        }
      });
    }
  
    return new Response(JSON.stringify(cartItem));
  }
  

// Update quantity of a cart item
export async function PUT(request: Request) {
  const body = await request.json();
  const cartItem = await prisma.cartItem.update({
    where: {
      id: body.id,
    },
    data: {
      quantity: body.quantity,
    },
  });
  return new Response(JSON.stringify(cartItem));
}

// Remove an item from a cart
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const cartItem = await prisma.cartItem.delete({
    where: {
      id: Number(id),
    },
  });
  return new Response(JSON.stringify(cartItem));
}
