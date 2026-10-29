import styled from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

export const CartItemContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px 0;

  & + & {
    border-top: 1px solid ${Colors.border};
  }
`

export const CartItemImage = styled.img`
  flex-shrink: 0;
  width: 88px;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: ${Tokens.radius.sm};
  background-color: ${Colors.background.surface};
`

export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
`

export const CartItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`

export const CartItemName = styled.p`
  font-weight: 500;
  line-height: 1.35;
  color: ${Colors.text.dark};
`

export const CartItemPrice = styled.p`
  margin-top: 2px;
  font-size: 0.875rem;
  color: ${Colors.text.muted};
  font-variant-numeric: tabular-nums;
`

export const CartItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
`

export const CartItemQuantity = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: ${Tokens.radius.sm};
  box-shadow: inset 0 0 0 1px ${Colors.border};

  span {
    min-width: 28px;
    text-align: center;
    font-size: 0.9375rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }
`

export const QuantityButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${Tokens.radius.sm};
  background: none;
  color: ${Colors.text.dark};
  cursor: pointer;
  transition: background-color 200ms ${Tokens.easing.out};

  &:hover {
    background-color: ${Colors.background.surface};
  }

  &:active {
    transform: scale(0.92);
  }
`

export const CartItemSubtotal = styled.p`
  font-weight: 600;
  color: ${Colors.text.dark};
  font-variant-numeric: tabular-nums;
`

export const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin: -8px -10px 0 0;
  border: none;
  border-radius: ${Tokens.radius.sm};
  background: none;
  color: ${Colors.text.muted};
  cursor: pointer;
  transition:
    background-color 200ms ${Tokens.easing.out},
    color 200ms ${Tokens.easing.out};

  &:hover {
    background-color: ${Colors.background.surface};
    color: ${Colors.error};
  }
`
