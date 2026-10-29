import styled from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

export const NotFoundContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(40px, 8vw, 96px) 0;
`

export const NotFoundCode = styled.p`
  margin-bottom: -36px;
  font-family: ${Tokens.fonts.display};
  font-size: clamp(7rem, 18vw, 11rem);
  font-style: italic;
  line-height: 1;
  letter-spacing: -0.04em;
  color: ${Colors.accent};
  user-select: none;
`
