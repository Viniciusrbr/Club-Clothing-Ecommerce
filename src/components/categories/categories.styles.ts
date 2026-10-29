import styled from 'styled-components'
import { Link } from 'react-router'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'
import { Skeleton } from '../skeleton/skeleton.styles'

export const CategoriesContainer = styled.div`
  width: 100%;
  max-width: ${Tokens.container};
  margin: 0 auto;
  padding: clamp(32px, 6vw, 72px) clamp(16px, 4vw, 40px) clamp(48px, 8vw, 96px);
`

export const CategoriesIntro = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px 48px;
  margin-bottom: clamp(28px, 4vw, 48px);

  @media (max-width: ${Tokens.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const CategoriesTitle = styled.h1`
  max-width: 16ch;
  font-family: ${Tokens.fonts.display};
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.025em;
  color: ${Colors.text.dark};

  em {
    color: ${Colors.accent};
  }
`

export const CategoriesSubtitle = styled.p`
  max-width: 46ch;
  margin-top: 18px;
  font-size: 1.0625rem;
  color: ${Colors.text.muted};
`

export const ExploreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  flex-shrink: 0;
  font-weight: 500;
  color: ${Colors.text.dark};
  text-decoration: underline;
  text-decoration-color: ${Colors.border};
  text-underline-offset: 6px;
  transition: text-decoration-color 200ms ${Tokens.easing.out};

  svg {
    transition: transform 250ms ${Tokens.easing.out};
  }

  &:hover {
    text-decoration-color: ${Colors.text.dark};

    svg {
      transform: translateX(4px);
    }
  }
`

// Grade assimétrica: 7/5, faixa larga, 5/7
export const CategoriesContent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: clamp(12px, 1.5vw, 20px);

  & > * {
    grid-column: span 6;
    height: clamp(280px, 34vw, 460px);
  }

  & > *:nth-child(5n + 1),
  & > *:nth-child(5n + 5) {
    grid-column: span 7;
  }

  & > *:nth-child(5n + 2),
  & > *:nth-child(5n + 4) {
    grid-column: span 5;
  }

  & > *:nth-child(5n + 3) {
    grid-column: span 12;
    height: clamp(220px, 24vw, 340px);
  }

  @media (max-width: ${Tokens.breakpoints.md}) {
    grid-template-columns: 1fr;

    & > *,
    & > *:nth-child(n) {
      grid-column: auto;
      height: auto;
      aspect-ratio: 4 / 3;
    }
  }
`

export const CategoriesSkeleton = styled(Skeleton)`
  border-radius: ${Tokens.radius.lg};
`
