import axios from 'axios'

interface Category {
    id?: number
    name: string
    tax: number
    
}


interface Product{
    id?: number
    name: string
    price: number
    category?: Category
    categoryID?: number
}

export async function getProducts() {
    const products = await axios.get('/api/products')
    return products.data
}

export async function createProduct(product:Product) {
    const newProduct = await axios.post('/api/products', product)
    return newProduct.data
}

export async function updateProduct(product:Product) {
    const updatedProduct = await axios.put(`/api/products`, product)
    return updatedProduct.data
}

export async function deleteProduct(id:number) {
    const deletedProduct = await axios.delete(`/api/products?id=${id}`)
    return deletedProduct.data
}
