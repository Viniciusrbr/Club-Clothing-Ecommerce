import styled from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'
import { productsGrid } from '../product-item/product-item.styles'
import { Skeleton } from '../skeleton/skeleton.styles'

export const Container = styled.div`
  width: 100%;
  max-width: ${Tokens.container};
  margin: 0 auto;
  padding: clamp(32px, 6vw, 72px) clamp(16px, 4vw, 40px) clamp(56px, 8vw, 104px);
`

export const OverviewHeader = styled.div`
  padding-bottom: clamp(28px, 4vw, 40px);
  border-bottom: 1px solid ${Colors.border};
`

export const OverviewTitle = styled.h1`
  font-family: ${Tokens.fonts.display};
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${Colors.text.dark};
`

export const OverviewSubtitle = styled.p`
  max-width: 52ch;
  margin-top: 14px;
  font-size: 1.0625rem;
  color: ${Colors.text.muted};
`

export const SkeletonSection = styled.div`
  margin-top: clamp(40px, 6vw, 72px);
`

export const SkeletonTitle = styled(Skeleton)`
  width: 180px;
  height: 32px;
  margin-bottom: 24px;
  border-radius: 4px;
`

export const SkeletonGrid = styled.div`
  ${productsGrid}
`
