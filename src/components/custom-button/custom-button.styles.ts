import styled, { css } from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

interface CustomButtonContainerProps {
    $variant: 'primary' | 'secondary'
}

const variants = {
    primary: css`
    background-color: ${Colors.background.dark};
    color: ${Colors.text.white};
    box-shadow: ${Tokens.shadow.sm};

    &:hover:not(:disabled) {
      background-color: #34312C;
    }
  `,
    secondary: css`
    background-color: transparent;
    color: ${Colors.text.dark};
    box-shadow: inset 0 0 0 1px ${Colors.border};

    &:hover:not(:disabled) {
      background-color: ${Colors.background.surface};
      box-shadow: inset 0 0 0 1px #CFC8BC;
    }
  `
}

export const CustomButtonContainer = styled.button<CustomButtonContainerProps>`
  width: 100%;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 20px;
  border: none;
  border-radius: ${Tokens.radius.sm};
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition:
    background-color 200ms ${Tokens.easing.out},
    box-shadow 200ms ${Tokens.easing.out},
    transform 120ms ${Tokens.easing.out};

  ${(props) => variants[props.$variant]}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`

export const IconContainer = styled.span`
  display: inline-flex;
  font-size: 1.125rem;
`
