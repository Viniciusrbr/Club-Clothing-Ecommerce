import styled from 'styled-components'
import { Link } from 'react-router'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'
import { productsGrid } from '../product-item/product-item.styles'

export const CategoryContainer = styled.section`
  width: 100%;
  margin-top: clamp(40px, 6vw, 72px);
`

export const CategoryHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
`

export const CategoryTitle = styled.h2`
  font-family: ${Tokens.fonts.display};
  font-size: clamp(2rem, 3.4vw, 2.75rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: ${Colors.text.dark};
`

export const CategoryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  flex-shrink: 0;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${Colors.text.dark};
  text-decoration: none;

  span {
    color: ${Colors.text.muted};
    font-variant-numeric: tabular-nums;
  }

  svg {
    transition: transform 250ms ${Tokens.easing.out};
  }

  &:hover svg {
    transform: translateX(4px);
  }
`

export const ProductsContainer = styled.div`
  ${productsGrid}
`
