import { FunctionComponent } from 'react'

// Styles
import {
    ProductSkeleton,
    ProductSkeletonImage,
    ProductSkeletonText
} from './product-item.styles'

const ProductItemSkeleton: FunctionComponent = () => {
    return (
        <ProductSkeleton aria-hidden="true">
            <ProductSkeletonImage />
            <ProductSkeletonText />
        </ProductSkeleton>
    )
}

export default ProductItemSkeleton
