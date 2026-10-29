import { FunctionComponent, useContext, useEffect } from 'react'
import { PiArrowClockwise, PiWarningCircle } from 'react-icons/pi'

// Styles
import {
    Container,
    OverviewHeader,
    OverviewSubtitle,
    OverviewTitle,
    SkeletonGrid,
    SkeletonSection,
    SkeletonTitle
} from './categories-overview.styles'

// Utilities
import { CategoryContext } from '../../contexts/category.context'

// Components
import CategoryOverview from '../category-overview/category-overview.component'
import CustomButton from '../custom-button/custom-button.component'
import ProductItemSkeleton from '../product-item/product-item-skeleton.component'
import StatusMessage from '../status-message/status-message.component'

const CategoriesOverview: FunctionComponent = () => {
    const { categories, isLoading, hasError, fetchCategories } =
        useContext(CategoryContext)

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories()
        }
    }, [])

    const showSkeleton = isLoading && categories.length === 0

    return (
        <Container>
            <OverviewHeader>
                <OverviewTitle>Explorar</OverviewTitle>
                <OverviewSubtitle>
                    Uma prévia de cada categoria. Abra uma delas para ver todos os
                    produtos.
                </OverviewSubtitle>
            </OverviewHeader>

            {hasError && categories.length === 0 && (
                <StatusMessage
                    tone="error"
                    icon={<PiWarningCircle />}
                    title="Não conseguimos carregar os produtos"
                    description="Verifique sua conexão e tente novamente.">
                    <CustomButton
                        variant="secondary"
                        startIcon={<PiArrowClockwise />}
                        onClick={fetchCategories}>
                        Tentar novamente
                    </CustomButton>
                </StatusMessage>
            )}

            {showSkeleton &&
                Array.from({ length: 2 }).map((_, sectionIndex) => (
                    <SkeletonSection key={sectionIndex} aria-busy="true">
                        <SkeletonTitle />
                        <SkeletonGrid>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <ProductItemSkeleton key={index} />
                            ))}
                        </SkeletonGrid>
                    </SkeletonSection>
                ))}

            {!showSkeleton &&
                categories.map((category) => (
                    <CategoryOverview key={category.id} category={category} />
                ))}
        </Container>
    )
}

export default CategoriesOverview
