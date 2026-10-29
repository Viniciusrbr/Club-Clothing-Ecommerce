import styled, { keyframes } from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

const shimmer = keyframes`
  from { background-position: 100% 0; }
  to { background-position: -100% 0; }
`

export const Skeleton = styled.div`
  background: linear-gradient(
    90deg,
    ${Colors.background.surface} 0%,
    #F5F2EC 50%,
    ${Colors.background.surface} 100%
  );
  background-size: 200% 100%;
  border-radius: ${Tokens.radius.md};
  animation: ${shimmer} 1.4s ease-in-out infinite;
`
