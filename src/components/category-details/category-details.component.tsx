import { FunctionComponent, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { PiArrowLeft, PiMagnifyingGlass, PiWarningCircle } from 'react-icons/pi'
import { useNavigate } from 'react-router'

// Utilities
import { db } from '../../config/firebase.config'
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
    const [category, setCategory] = useState<Category | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setIsLoading(true)

                const querySnapshot = await getDocs(
                    query(
                        collection(db, 'categories').withConverter(categoryConverter),
                        where('id', '==', categoryId)
                    )
                )

                const category = querySnapshot.docs[0]?.data()

                setCategory(category ?? null)
            } catch (error) {
                console.log(error)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCategory()
    }, [])

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
