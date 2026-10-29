import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { PiArrowLeft, PiMagnifyingGlass, PiWarningCircle } from 'react-icons/pi'
import { useNavigate } from 'react-router'

// Utilities
import { db } from '../../config/firebase.config'
import { CategoryContext } from '../../contexts/category.context'
import { categoryConverter } from '../../converters/firestore.converters'
import Category from '../../types/category.types'

// Components
import ProductItem from '../product-item/product-item.component'
import ProductItemSkeleton from '../product-item/product-item-skeleton.component'
import CustomButton from '../custom-button/custom-button.component'
import StatusMessage from '../status-message/status-message.component'

// Styles
import {
    BackLink,
    CategoryCount,
    CategoryHeader,
    CategoryTitle,
    Container,
    ProductsContainer,
    TitleSkeleton
} from './category-details.styles'

interface CategoryDetailsProps {
    categoryId: string
}

const SKELETON_ITEMS = 8

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
    categoryId
}) => {
    const { categories } = useContext(CategoryContext)
    const cachedCategory = categories.find(
        (category) => category.id === categoryId
    )

    const [fetchedCategory, setFetchedCategory] = useState<Category | null>(null)
    const [isLoading, setIsLoading] = useState(!cachedCategory)
    const [hasError, setHasError] = useState(false)

    const category = cachedCategory ?? fetchedCategory
    const isCached = cachedCategory !== undefined

    const navigate = useNavigate()

    useEffect(() => {
        if (isCached) return

        const fetchCategory = async () => {
            try {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, 'categories').withConverter(categoryConverter),
                        where('id', '==', categoryId)
                    )
                )

                const categoryFromFirestore = querySnapshot.docs[0]?.data()

                setFetchedCategory(categoryFromFirestore ?? null)
            } catch (error) {
                console.error(error)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategory()
    }, [isCached, categoryId])

    const renderContent = () => {
        if (isLoading) {
            return (
                <ProductsContainer aria-busy="true" aria-label="Carregando produtos">
                    {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
                        <ProductItemSkeleton key={index} />
                    ))}
                </ProductsContainer>
            )
        }

        if (hasError) {
            return (
                <StatusMessage
                    tone="error"
                    icon={<PiWarningCircle />}
                    title="Não conseguimos carregar esta categoria"
                    description="Verifique sua conexão e recarregue a página."
                />
            )
        }

        if (!category) {
            return (
                <StatusMessage
                    icon={<PiMagnifyingGlass />}
                    title="Categoria não encontrada"
                    description="Ela pode ter sido removida ou o endereço está incorreto.">
                    <CustomButton onClick={() => navigate('/explore')}>
                        Ver todas as categorias
                    </CustomButton>
                </StatusMessage>
            )
        }

        return (
            <ProductsContainer>
                {category.products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </ProductsContainer>
        )
    }

    return (
        <Container>
            <BackLink to="/">
                <PiArrowLeft aria-hidden="true" />
                Início
            </BackLink>

            <CategoryHeader>
                {isLoading ? (
                    <TitleSkeleton />
                ) : (
                    category && (
                        <>
                            <CategoryTitle>{category.displayName}</CategoryTitle>
                            <CategoryCount>
                                {category.products.length === 1
                                    ? '1 produto'
                                    : `${category.products.length} produtos`}
                            </CategoryCount>
                        </>
                    )
                )}
            </CategoryHeader>

            {renderContent()}
        </Container>
    )
}

export default CategoryDetails
