
import axios from 'axios'

interface Category {
    id?: number
    name: string
    tax: number
    
}


export async function getCategories() {
    const categories = await axios.get('/api/categories')
    return categories.data
}

export async function createCategory(category:Category) {
    const newCategory = await axios.post('/api/categories', category)
    return newCategory.data
}


export async function updateCategory(category:Category) {
    const updatedCategory = await axios.put('/api/categories', category)
    return updatedCategory.data
}

export async function deleteCategory(categoryID: any) {
    const deletedCategory = await axios.delete(`/api/categories?id=${categoryID}`)
    return deletedCategory.data
}
