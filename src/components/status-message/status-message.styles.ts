import styled from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

interface StatusMessageIconProps {
    $tone: 'neutral' | 'success' | 'error'
}

const toneColors = {
    neutral: Colors.text.dark,
    success: Colors.success,
    error: Colors.error
}

export const StatusMessageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 24px 56px;
`

export const StatusMessageIcon = styled.span<StatusMessageIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  border-radius: ${Tokens.radius.lg};
  background-color: ${Colors.background.surface};
  color: ${(props) => toneColors[props.$tone]};
  font-size: 1.75rem;
`

export const StatusMessageTitle = styled.h2`
  font-family: ${Tokens.fonts.display};
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: ${Colors.text.dark};
`

export const StatusMessageText = styled.p`
  margin-top: 10px;
  color: ${Colors.text.muted};
  max-width: 38ch;
`

export const StatusMessageActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 28px;
`
