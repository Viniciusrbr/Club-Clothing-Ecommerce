import { ComponentProps, FunctionComponent } from 'react'

// Styles
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends ComponentProps<'input'> {
    hasError?: boolean
}

const CustomInput: FunctionComponent<CustomInputProps> = ({
    hasError,
    ...props
}) => {
    return (
        <CustomInputContainer
            $hasError={hasError}
            aria-invalid={hasError || undefined}
            {...props}
        />
    )
}

export default CustomInput
