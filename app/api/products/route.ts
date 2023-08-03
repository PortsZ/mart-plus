import {prisma} from '@/components/lib/prisma'

export async function GET() {
    const products = await prisma.product.findMany({
        orderBy: {
        id: 'asc',
        },
        include: {
            category: true,  // Include related category
        },
    })
    return new Response(JSON.stringify(products))
}

export async function POST(request: Request) {
    const body = await request.json()
    const product = await prisma.product.create({
        data: {
            name: body.name,
            price: Number(body.price),
            category: {
                connect: {
                    id: Number(body.categoryId),
                },
            },
        },
    })
    return new Response(JSON.stringify(product))
}

export async function PUT(request: Request) {
    const body = await request.json()
    const product = await prisma.product.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            price: body.price,
            category: {
                connect: {
                    id: body.categoryId,
                },
            },
        },
    })
    return new Response(JSON.stringify(product))
}

export async function DELETE(request: Request) {
    // Get the product ID from URL parameters
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const product = await prisma.product.delete({
        where: {
            id: Number(id),
        },
    })
    return new Response(JSON.stringify(product))
}