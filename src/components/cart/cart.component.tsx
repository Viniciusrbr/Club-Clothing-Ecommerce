import { FunctionComponent, useContext, useEffect, useRef } from 'react'
import { PiArrowRight, PiLockSimple, PiShoppingBagOpen, PiX } from 'react-icons/pi'
import { useNavigate } from 'react-router'

// Utilities
import { CartContext } from '../../contexts/cart.context'
import formatPrice from '../../helpers/format-price'

// Components
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import StatusMessage from '../status-message/status-message.component'

// Styles
import {
    CartBackdrop,
    CartCloseButton,
    CartContainer,
    CartContent,
    CartFooter,
    CartHeader,
    CartItems,
    CartNote,
    CartTitle,
    CartTotal
} from './cart.styles'

const Cart: FunctionComponent = () => {
    const { isVisible, products, productsTotalPrice, productsCount, toggleCart } =
        useContext(CartContext)

    const closeButtonRef = useRef<HTMLButtonElement>(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isVisible) return

        closeButtonRef.current?.focus()
        document.body.style.overflow = 'hidden'

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') toggleCart()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isVisible])

    const handleGoToCheckoutClick = () => {
        navigate('/checkout')
        toggleCart()
    }

    const handleExploreClick = () => {
        navigate('/explore')
        toggleCart()
    }

    return (
        <CartContainer $isVisible={isVisible}>
            <CartBackdrop onClick={toggleCart} />

            <CartContent
                id="cart-drawer"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title">
                <CartHeader>
                    <CartTitle id="cart-title">
                        Seu carrinho
                        {productsCount > 0 && <span>{productsCount}</span>}
                    </CartTitle>

                    <CartCloseButton
                        ref={closeButtonRef}
                        type="button"
                        onClick={toggleCart}
                        aria-label="Fechar carrinho">
                        <PiX size={20} aria-hidden="true" />
                    </CartCloseButton>
                </CartHeader>

                {productsCount === 0 && (
                    <StatusMessage
                        icon={<PiShoppingBagOpen />}
                        title="Seu carrinho está vazio"
                        description="Os produtos que você adicionar aparecem aqui.">
                        <CustomButton onClick={handleExploreClick}>
                            Explorar produtos
                        </CustomButton>
                    </StatusMessage>
                )}

                {productsCount > 0 && (
                    <>
                        <CartItems>
                            {products.map((product) => (
                                <CartItem key={product.id} product={product} />
                            ))}
                        </CartItems>

                        <CartFooter>
                            <CartTotal>
                                <span>Subtotal</span>
                                <strong>{formatPrice(productsTotalPrice)}</strong>
                            </CartTotal>

                            <CustomButton onClick={handleGoToCheckoutClick}>
                                Ir para o checkout
                                <PiArrowRight aria-hidden="true" />
                            </CustomButton>

                            <CartNote>
                                <PiLockSimple aria-hidden="true" />
                                Pagamento processado com segurança pela Stripe
                            </CartNote>
                        </CartFooter>
                    </>
                )}
            </CartContent>
        </CartContainer>
    )
}

export default Cart
