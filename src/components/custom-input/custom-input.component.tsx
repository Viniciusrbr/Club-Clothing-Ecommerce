import React, { FunctionComponent, InputHTMLAttributes } from 'react'

// Styles
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
}

const CustomInput: FunctionComponent<CustomInputProps> = React.forwardRef(
    ({ hasError, ...props }, ref) => {
        return (
            <CustomInputContainer
                $hasError={hasError}
                aria-invalid={hasError || undefined}
                {...props}
                ref={ref as any}
            />
        )
    }
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
