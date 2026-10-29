import { collection, getDocs } from 'firebase/firestore'
import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState
} from 'react'

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

const CategoryContextProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([])
    // Começa como true para exibir o skeleton até a primeira busca terminar
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const pendingRequestRef = useRef<Promise<void> | null>(null)

    const fetchCategories = useCallback(() => {
        if (pendingRequestRef.current) return pendingRequestRef.current

        const request = (async () => {
            try {
                setIsLoading(true)
                setHasError(false)

                const querySnapshot = await getDocs(
                    collection(db, 'categories').withConverter(categoryConverter)
                )

                setCategories(querySnapshot.docs.map((doc) => doc.data()))
            } catch (error) {
                console.error(error)
                setHasError(true)
            } finally {
                setIsLoading(false)
                pendingRequestRef.current = null
            }
        })()

        pendingRequestRef.current = request

        return request
    }, [])

    const value = useMemo(
        () => ({ categories, isLoading, hasError, fetchCategories }),
        [categories, isLoading, hasError, fetchCategories]
    )

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider
