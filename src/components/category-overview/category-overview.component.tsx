import { FunctionComponent } from 'react'

// Styles
import {
    CategoryContainer,
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
    return (
        <CategoryContainer>
            <CategoryTitle>{category.displayName}</CategoryTitle>

            <ProductsContainer>
                {category.products.slice(0, 4).map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </ProductsContainer>
        </CategoryContainer>
    )
}

export default CategoryOverview