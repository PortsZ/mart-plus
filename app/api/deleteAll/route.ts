import {prisma} from '@/components/lib/prisma'

export async function DELETE(request: Request) {
    
    await prisma.cartItem.deleteMany({});
    //delete all carts
    const deleteManyResult = await prisma.cart.deleteMany({
        where: {
            id: {
                not: 0
            }
        }})

        return new Response(JSON.stringify(deleteManyResult));
}