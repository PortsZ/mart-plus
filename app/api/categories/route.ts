import {prisma} from '@/components/lib/prisma'

export async function GET() {
    const category = await prisma.category.findMany({
        orderBy: {
        id: 'asc',
        },
        
    })
    return new Response(JSON.stringify(category))
}

export async function POST(request: Request) {
    const body = await request.json()
    const category = await prisma.category.create({
        data: {
            name: body.name,
            tax: body.tax,
        },
    })
    return new Response(JSON.stringify(category))
}

export async function PUT(request: Request) {
    const body = await request.json()
    const category = await prisma.category.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            tax: body.tax,
        },
    })
    return new Response(JSON.stringify(category))
}

export async function DELETE(request: Request) {
    // Get the category ID from URL parameters
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const category = await prisma.category.delete({
        where: {
            id: Number(id),
        },
    })
    return new Response(JSON.stringify(category))
}
