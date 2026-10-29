import styled from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

type CustomInputContainerProps = {
    $hasError?: boolean
}

export const CustomInputContainer = styled.input<CustomInputContainerProps>`
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  font-size: 1rem;
  background-color: ${Colors.input.background};
  border-radius: ${Tokens.radius.sm};
  color: ${Colors.text.dark};
  border: ${(props) => (props.$hasError ? `2px solid ${Colors.error}` : 'none')};
  transition: background-color 200ms ${Tokens.easing.out};

  &::placeholder {
    color: ${Colors.input.placeholder};
  }

  &:hover {
    background-color: #E9E5DD;
  }

  &:focus {
    outline: 2px solid ${(props) => (props.$hasError ? Colors.error : Colors.text.dark)};
    outline-offset: 2px;
    background-color: ${Colors.background.white};
  }
`
