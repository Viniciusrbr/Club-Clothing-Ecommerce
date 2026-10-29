import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

export const CategoryImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 900ms ${Tokens.easing.out};
`

export const CategoryItemContainer = styled(Link)`
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border-radius: ${Tokens.radius.lg};
  background-color: ${Colors.background.surface};
  color: ${Colors.text.white};
  text-decoration: none;
  isolation: isolate;
  animation: ${fadeUp} 700ms ${Tokens.easing.out} both;

  &:nth-child(2) { animation-delay: 80ms; }
  &:nth-child(3) { animation-delay: 160ms; }
  &:nth-child(4) { animation-delay: 240ms; }
  &:nth-child(5) { animation-delay: 320ms; }

  /* Gradiente na base para garantir contraste do texto sobre a foto */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(24, 20, 16, 0.72) 0%,
      rgba(24, 20, 16, 0.18) 45%,
      rgba(24, 20, 16, 0) 70%
    );
    transition: opacity 400ms ${Tokens.easing.out};
  }

  &:hover ${CategoryImage}, &:focus-visible ${CategoryImage} {
    transform: scale(1.04);
  }
`

export const CategoryCaption = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: clamp(20px, 2.5vw, 32px);
`

export const CategoryName = styled.p`
  font-family: ${Tokens.fonts.display};
  font-size: clamp(2rem, 3.6vw, 3.25rem);
  line-height: 1;
  letter-spacing: -0.02em;
`

export const CategoryAction = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 8px 12px 8px 14px;
  border-radius: ${Tokens.radius.sm};
  background-color: rgba(247, 245, 241, 0.16);
  box-shadow: inset 0 0 0 1px rgba(247, 245, 241, 0.28);
  backdrop-filter: blur(8px);
  font-size: 0.875rem;
  font-weight: 500;
  transition:
    background-color 250ms ${Tokens.easing.out},
    color 250ms ${Tokens.easing.out};

  svg {
    transition: transform 250ms ${Tokens.easing.out};
  }

  ${CategoryItemContainer}:hover & {
    background-color: ${Colors.text.white};
    color: ${Colors.text.dark};

    svg {
      transform: translate(2px, -2px);
    }
  }
`
