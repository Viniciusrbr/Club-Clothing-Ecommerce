import styled, { keyframes } from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const LoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px;
  background-color: rgba(31, 29, 26, 0.6);
  backdrop-filter: blur(6px);
  z-index: ${Tokens.zIndex.loading};
  animation: ${fadeIn} 200ms ${Tokens.easing.out};

  p {
    color: ${Colors.text.white};
    font-size: 1.125rem;
    font-weight: 500;
    max-width: 36ch;
    text-align: center;
  }
`
