import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { PiShoppingBag } from 'react-icons/pi'

// Utilities
import { auth } from '../../config/firebase.config'
import { CartContext } from '../../contexts/cart.context'
import { UserContext } from '../../contexts/user.context'

// Styles
import {
  CartButton,
  CartCount,
  HeaderContainer,
  HeaderContent,
  HeaderItem,
  HeaderItems,
  HeaderNav,
  HeaderTitle,
  SignOutButton,
  SkipLink
} from './header.styles'

const Header = () => {
  const { isAuthenticated } = useContext(UserContext)
  const { isVisible, productsCount, toggleCart } = useContext(CartContext)

  const cartLabel =
    productsCount === 1
      ? 'Abrir carrinho, 1 item'
      : `Abrir carrinho, ${productsCount} itens`

  return (
    <HeaderContainer>
      <SkipLink href="#conteudo">Pular para o conteúdo</SkipLink>

      <HeaderContent>
        <HeaderTitle to="/">Club Clothing</HeaderTitle>

        <HeaderNav aria-label="Principal">
          <HeaderItems>
            <li>
              <HeaderItem to="/explore">Explorar</HeaderItem>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <HeaderItem to="/login">Entrar</HeaderItem>
                </li>
                <li>
                  <HeaderItem to="/sign-up">Criar conta</HeaderItem>
                </li>
              </>
            )}

            {isAuthenticated && (
              <li>
                <SignOutButton type="button" onClick={() => signOut(auth)}>
                  Sair
                </SignOutButton>
              </li>
            )}
          </HeaderItems>

          <CartButton
            type="button"
            onClick={toggleCart}
            aria-label={cartLabel}
            aria-expanded={isVisible}
            aria-controls="cart-drawer">
            <PiShoppingBag size={22} aria-hidden="true" />
            {productsCount > 0 && (
              <CartCount aria-hidden="true">{productsCount}</CartCount>
            )}
          </CartButton>
        </HeaderNav>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
