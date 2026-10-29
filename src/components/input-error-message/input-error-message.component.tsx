import { FunctionComponent } from 'react'
import { PiWarningCircle } from 'react-icons/pi'

// Styles
import { InputErrorMessageContainer } from './input-error-message.styles'

type InputErrorMessageProps = {
    children: React.ReactNode;
}

const InputErrorMessage: FunctionComponent<InputErrorMessageProps> = ({ children }) => {
    return (
        <InputErrorMessageContainer role="alert">
            <PiWarningCircle aria-hidden="true" />
            {children}
        </InputErrorMessageContainer>
    )
}

export default InputErrorMessage
