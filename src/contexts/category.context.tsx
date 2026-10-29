import { collection, getDocs } from 'firebase/firestore'
import { createContext, useState } from 'react'

// Utilities
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converters/firestore.converters'
import Category from '../types/category.types'

interface ICategoryContext {
    categories: Category[]
    isLoading: boolean
    hasError: boolean
    fetchCategories: () => Promise<void>
}

export const CategoryContext = createContext<ICategoryContext>({
    categories: [],
    isLoading: false,
    hasError: false,
    fetchCategories: () => Promise.resolve()
})

const CategoryContextProvider = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([])
    // Começa como true para exibir o skeleton até a primeira busca terminar
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const fetchCategories = async () => {
        try {
            setIsLoading(true)
            setHasError(false)

            const categoriesFromFirestore: Category[] = []

            const querySnapshot = await getDocs(
                collection(db, 'categories').withConverter(categoryConverter)
            )

            querySnapshot.forEach((doc) => {
                categoriesFromFirestore.push(doc.data())
            })

            setCategories(categoriesFromFirestore)
        } catch (error) {
            console.log({ error })
            setHasError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CategoryContext.Provider
            value={{ categories, isLoading, hasError, fetchCategories }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider
