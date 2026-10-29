import styled, { css, keyframes } from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'
import { Skeleton } from '../skeleton/skeleton.styles'

interface ProductActionProps {
  $isAdded: boolean
}

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`

// Grade compartilhada pelas listas de produtos
export const productsGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr));
  gap: 40px clamp(12px, 1.6vw, 24px);

  @media (max-width: ${Tokens.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 12px;
  }
`

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms ${Tokens.easing.out};
`

export const ProductAction = styled.div<ProductActionProps>`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  transition:
    opacity 250ms ${Tokens.easing.out},
    transform 250ms ${Tokens.easing.out};

  ${(props) =>
    props.$isAdded &&
    css`
      button,
      button:hover:not(:disabled) {
        background-color: ${Colors.success};
      }
    `}

  @media (hover: hover) {
    opacity: ${(props) => (props.$isAdded ? 1 : 0)};
    transform: translateY(${(props) => (props.$isAdded ? 0 : '8px')});
  }

  @media (max-width: ${Tokens.breakpoints.sm}) {
    left: 8px;
    right: 8px;
    bottom: 8px;

    button {
      min-height: 44px;
      padding: 0 12px;
      font-size: 0.875rem;
    }
  }
`

export const ProductImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: ${Tokens.radius.md};
  background-color: ${Colors.background.surface};
`

export const ProductContainer = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 0;
  animation: ${fadeUp} 600ms ${Tokens.easing.out} both;

  &:nth-child(2) { animation-delay: 60ms; }
  &:nth-child(3) { animation-delay: 120ms; }
  &:nth-child(4) { animation-delay: 180ms; }
  &:nth-child(n + 5) { animation-delay: 240ms; }

  @media (hover: hover) {
    &:hover ${ProductImage} {
      transform: scale(1.03);
    }

    &:hover ${ProductAction}, &:focus-within ${ProductAction} {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const ProductInfo = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;

  @media (max-width: ${Tokens.breakpoints.sm}) {
    flex-direction: column;
    gap: 2px;
  }
`

export const ProductName = styled.h3`
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.35;
  color: ${Colors.text.dark};
`

export const ProductPrice = styled.p`
  flex-shrink: 0;
  font-size: 0.9375rem;
  color: ${Colors.text.muted};
  font-variant-numeric: tabular-nums;
`

export const ProductSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const ProductSkeletonImage = styled(Skeleton)`
  aspect-ratio: 3 / 4;
`

export const ProductSkeletonText = styled(Skeleton)`
  height: 14px;
  width: 70%;
  border-radius: 4px;
`
