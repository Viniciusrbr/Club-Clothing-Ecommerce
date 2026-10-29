import styled from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

interface CartContainerProps {
  $isVisible: boolean
}

export const CartBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(31, 29, 26, 0.45);
  backdrop-filter: blur(2px);
  transition: opacity 300ms ${Tokens.easing.out};
`

export const CartContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(440px, 100%);
  height: 100%;
  margin-left: auto;
  background-color: ${Colors.background.white};
  box-shadow: ${Tokens.shadow.lg};
  transition: transform 400ms ${Tokens.easing.out};
`

export const CartContainer = styled.div<CartContainerProps>`
  position: fixed;
  inset: 0;
  z-index: ${Tokens.zIndex.cart};
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  /* Atrasa o "hidden" até o fim da animação de saída */
  transition: visibility 0s linear ${(props) => (props.$isVisible ? '0s' : '400ms')};

  ${CartBackdrop} {
    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  }

  ${CartContent} {
    transform: translateX(${(props) => (props.$isVisible ? '0' : '100%')});
  }
`

export const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 16px 20px 24px;
  border-bottom: 1px solid ${Colors.border};
`

export const CartTitle = styled.h2`
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-family: ${Tokens.fonts.display};
  font-size: 1.875rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${Colors.text.dark};

  span {
    font-family: ${Tokens.fonts.body};
    font-size: 0.9375rem;
    color: ${Colors.text.muted};
    font-variant-numeric: tabular-nums;
  }
`

export const CartCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: ${Tokens.radius.sm};
  background: none;
  color: ${Colors.text.dark};
  cursor: pointer;
  transition: background-color 200ms ${Tokens.easing.out};

  &:hover {
    background-color: ${Colors.background.surface};
  }
`

export const CartItems = styled.div`
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 8px 24px;
`

export const CartFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 24px 28px;
  border-top: 1px solid ${Colors.border};
  background-color: ${Colors.background.white};
`

export const CartTotal = styled.p`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  color: ${Colors.text.muted};

  strong {
    font-size: 1.25rem;
    font-weight: 600;
    color: ${Colors.text.dark};
    font-variant-numeric: tabular-nums;
  }
`

export const CartNote = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: ${Colors.text.muted};
`
