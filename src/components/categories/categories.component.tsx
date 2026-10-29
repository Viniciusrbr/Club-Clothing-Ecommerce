import { useContext, useEffect } from 'react'
import { PiArrowClockwise, PiArrowRight, PiWarningCircle } from 'react-icons/pi'

// Components
import CategoryItem from '../category-item/category-item.component'
import CustomButton from '../custom-button/custom-button.component'
import StatusMessage from '../status-message/status-message.component'

// Styles
import {
    CategoriesContainer,
    CategoriesContent,
    CategoriesIntro,
    CategoriesSkeleton,
    CategoriesSubtitle,
    CategoriesTitle,
    ExploreLink
} from './categories.styles'

// Utilities
import { CategoryContext } from '../../contexts/category.context'

const SKELETON_ITEMS = 5

const Categories = () => {
    const { categories, isLoading, hasError, fetchCategories } =
        useContext(CategoryContext)

    useEffect(() => {
        fetchCategories()
    }, [])

    const showSkeleton = isLoading && categories.length === 0

    return (
        <CategoriesContainer>
            <CategoriesIntro>
                <div>
                    <CategoriesTitle>
                        Peças para todos os dias, <em>por categoria</em>
                    </CategoriesTitle>
                    <CategoriesSubtitle>
                        Escolha uma categoria para ver os produtos ou navegue por todo o
                        catálogo.
                    </CategoriesSubtitle>
                </div>

                <ExploreLink to="/explore">
                    Ver todos os produtos
                    <PiArrowRight aria-hidden="true" />
                </ExploreLink>
            </CategoriesIntro>

            {hasError && categories.length === 0 && (
                <StatusMessage
                    tone="error"
                    icon={<PiWarningCircle />}
                    title="Não conseguimos carregar as categorias"
                    description="Verifique sua conexão e tente novamente.">
                    <CustomButton
                        variant="secondary"
                        startIcon={<PiArrowClockwise />}
                        onClick={fetchCategories}>
                        Tentar novamente
                    </CustomButton>
                </StatusMessage>
            )}

            {showSkeleton && (
                <CategoriesContent aria-busy="true" aria-label="Carregando categorias">
                    {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
                        <CategoriesSkeleton key={index} />
                    ))}
                </CategoriesContent>
            )}

            {!showSkeleton && categories.length > 0 && (
                <CategoriesContent>
                    {categories.map((category) => (
                        <CategoryItem key={category.id} category={category} />
                    ))}
                </CategoriesContent>
            )}
        </CategoriesContainer>
    )
}

export default Categories
