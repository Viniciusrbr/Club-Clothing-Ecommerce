import { FunctionComponent } from 'react'
import { PiArrowUpRight } from 'react-icons/pi'

// Utilities
import Category from '../../types/category.types'

// Styles
import {
    CategoryAction,
    CategoryImage,
    CategoryItemContainer,
    CategoryName,
    CategoryCaption
} from './category-item.styles'

interface CategoryItemProps {
    category: Category
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
    return (
        <CategoryItemContainer to={`/category/${category.id}`}>
            <CategoryImage src={category.imageUrl} alt="" loading="lazy" />

            <CategoryCaption>
                <CategoryName>{category.displayName}</CategoryName>
                <CategoryAction>
                    <span>Explorar</span>
                    <PiArrowUpRight aria-hidden="true" />
                </CategoryAction>
            </CategoryCaption>
        </CategoryItemContainer>
    )
}

export default CategoryItem
