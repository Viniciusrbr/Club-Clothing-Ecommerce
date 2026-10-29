import styled from 'styled-components'
import { Link } from 'react-router'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'
import { productsGrid } from '../product-item/product-item.styles'
import { Skeleton } from '../skeleton/skeleton.styles'

export const Container = styled.div`
  width: 100%;
  max-width: ${Tokens.container};
  margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) clamp(16px, 4vw, 40px) clamp(56px, 8vw, 104px);
`

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  margin-left: -4px;
  padding: 0 4px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${Colors.text.muted};
  text-decoration: none;
  transition: color 200ms ${Tokens.easing.out};

  svg {
    transition: transform 250ms ${Tokens.easing.out};
  }

  &:hover {
    color: ${Colors.text.dark};

    svg {
      transform: translateX(-3px);
    }
  }
`

export const CategoryHeader = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px 20px;
  min-height: clamp(48px, 6vw, 72px);
  margin: clamp(16px, 3vw, 28px) 0 clamp(28px, 4vw, 44px);
`

export const CategoryTitle = styled.h1`
  font-family: ${Tokens.fonts.display};
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${Colors.text.dark};
`

export const CategoryCount = styled.p`
  color: ${Colors.text.muted};
  font-variant-numeric: tabular-nums;
`

export const TitleSkeleton = styled(Skeleton)`
  width: min(320px, 70%);
  height: clamp(44px, 5vw, 64px);
  border-radius: 6px;
`

export const ProductsContainer = styled.div`
  ${productsGrid}
`
