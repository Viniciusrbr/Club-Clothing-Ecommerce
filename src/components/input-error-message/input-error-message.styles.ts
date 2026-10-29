import styled from 'styled-components'
import Colors from '../../theme/theme.colors'

export const InputErrorMessageContainer = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${Colors.error};
  font-size: 0.8125rem;
  margin-top: 8px;

  svg {
    flex-shrink: 0;
    font-size: 1rem;
  }
`
