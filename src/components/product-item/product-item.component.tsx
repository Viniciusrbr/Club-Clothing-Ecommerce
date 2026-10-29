import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import { PiCheck, PiPlus } from 'react-icons/pi'

// Components
import CustomButton from '../custom-button/custom-button.component'

// Styles
import {
    ProductAction,
    ProductContainer,
    ProductImage,
    ProductImageWrapper,
    ProductInfo,
    ProductName,
    ProductPrice
} from './product-item.styles'

// Utilities
import Product from '../../types/product.types'
import { CartContext } from '../../contexts/cart.context'
import formatPrice from '../../helpers/format-price'

interface ProductItemProps {
    product: Product
}

const ADDED_FEEDBACK_DURATION = 1600

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
    const [isAdded, setIsAdded] = useState(false)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const { addProductToCart } = useContext(CartContext)

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current)
    }, [])

    const handleAddToCartClick = () => {
        addProductToCart(product)

        setIsAdded(true)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(
            () => setIsAdded(false),
            ADDED_FEEDBACK_DURATION
        )
    }

    return (
        <ProductContainer>
            <ProductImageWrapper>
                <ProductImage src={product.imageUrl} alt={product.name} loading="lazy" />

                <ProductAction $isAdded={isAdded}>
                    <CustomButton
                        startIcon={isAdded ? <PiCheck /> : <PiPlus />}
                        onClick={handleAddToCartClick}
                        aria-label={`Adicionar ${product.name} ao carrinho`}>
                        {isAdded ? 'Adicionado' : 'Adicionar'}
                    </CustomButton>
                </ProductAction>
            </ProductImageWrapper>

            <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{formatPrice(product.price)}</ProductPrice>
            </ProductInfo>
        </ProductContainer>
    )
}

export default ProductItem
