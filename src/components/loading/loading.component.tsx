import { FunctionComponent } from 'react'
import { SyncLoader } from 'react-spinners'

import Colors from '../../theme/theme.colors'
import { LoadingContainer } from './loading.styles'

interface LoadingProps {
  message?: string
}

const Loading: FunctionComponent<LoadingProps> = ({ message }) => {
  return (
    <LoadingContainer role="status" aria-live="polite">
      {message && <p>{message}</p>}
      <SyncLoader size={10} margin={4} color={Colors.text.white} />
    </LoadingContainer>
  )
}

export default Loading
