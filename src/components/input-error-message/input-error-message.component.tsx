import { FunctionComponent } from 'react'

// Styles
import { InputErrorMessageContainer } from './input-error-message.styles'

type InputErrorMessageProps = {
    children: React.ReactNode;
}

const InputErrorMessage: FunctionComponent<InputErrorMessageProps> = ({ children }) => {
        return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage