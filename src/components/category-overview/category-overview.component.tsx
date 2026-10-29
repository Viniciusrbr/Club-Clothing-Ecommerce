import { FunctionComponent } from 'react'
import { PiArrowRight } from 'react-icons/pi'

// Styles
import {
    CategoryContainer,
    CategoryHeader,
    CategoryLink,
    CategoryTitle,
    ProductsContainer
} from './category-overview.styles'

// Utilities
import Category from '../../types/category.types'

interface CategoryOverviewProps {
    category: Category
}

// Components
import ProductItem from '../product-item/product-item.component'

const CategoryOverview: FunctionComponent<CategoryOverviewProps> = ({
    category
}) => {
    const titleId = `category-${category.id}-title`

    return (
        <CategoryContainer aria-labelledby={titleId}>
            <CategoryHeader>
                <CategoryTitle id={titleId}>{category.displayName}</CategoryTitle>

                <CategoryLink to={`/category/${category.id}`}>
                    Ver todos
                    <span>({category.products.length})</span>
                    <PiArrowRight aria-hidden="true" />
                </CategoryLink>
            </CategoryHeader>

            <ProductsContainer>
                {category.products.slice(0, 4).map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </ProductsContainer>
        </CategoryContainer>
    )
}

export default CategoryOverview
