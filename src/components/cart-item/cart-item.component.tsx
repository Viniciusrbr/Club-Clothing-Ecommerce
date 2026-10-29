import { FunctionComponent, useContext } from 'react'
import { PiMinus, PiPlus, PiTrash } from 'react-icons/pi'
import { CartActionsContext } from '../../contexts/cart.context'

// Utilities
import CartProduct from '../../types/cart.types'
import formatPrice from '../../helpers/format-price'

// Styles
import {
    CartItemContainer,
    CartItemFooter,
    CartItemHeader,
    CartItemImage,
    CartItemInfo,
    CartItemName,
    CartItemPrice,
    CartItemQuantity,
    CartItemSubtotal,
    QuantityButton,
    RemoveButton
} from './cart-item.styles'

interface CartItemProps {
    product: CartProduct
}

const CartItem: FunctionComponent<CartItemProps> = ({ product }) => {
    const {
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity
    } = useContext(CartActionsContext)

    const handleRemoveClick = () => {
        removeProductFromCart(product.id)
    }

    const handleIncreaseClick = () => {
        increaseProductQuantity(product.id)
    }

    const handleDecreaseClick = () => {
        decreaseProductQuantity(product.id)
    }

    return (
        <CartItemContainer>
            <CartItemImage src={product.imageUrl} alt={product.name} loading="lazy" />

            <CartItemInfo>
                <CartItemHeader>
                    <div>
                        <CartItemName>{product.name}</CartItemName>
                        <CartItemPrice>{formatPrice(product.price)}</CartItemPrice>
                    </div>

                    <RemoveButton
                        type="button"
                        onClick={handleRemoveClick}
                        aria-label={`Remover ${product.name} do carrinho`}>
                        <PiTrash size={18} aria-hidden="true" />
                    </RemoveButton>
                </CartItemHeader>

                <CartItemFooter>
                    <CartItemQuantity role="group" aria-label={`Quantidade de ${product.name}`}>
                        <QuantityButton
                            type="button"
                            onClick={handleDecreaseClick}
                            aria-label="Diminuir quantidade">
                            <PiMinus size={14} aria-hidden="true" />
                        </QuantityButton>
                        <span aria-live="polite">{product.quantity}</span>
                        <QuantityButton
                            type="button"
                            onClick={handleIncreaseClick}
                            aria-label="Aumentar quantidade">
                            <PiPlus size={14} aria-hidden="true" />
                        </QuantityButton>
                    </CartItemQuantity>

                    <CartItemSubtotal>
                        {formatPrice(product.price * product.quantity)}
                    </CartItemSubtotal>
                </CartItemFooter>
            </CartItemInfo>
        </CartItemContainer>
    )
}

export default CartItem
