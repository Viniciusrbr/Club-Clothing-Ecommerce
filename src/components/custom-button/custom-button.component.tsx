import React, { FunctionComponent, ButtonHTMLAttributes } from 'react'

import { CustomButtonContainer, IconContainer } from './custom-button.styles'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    startIcon?: React.ReactNode
    variant?: 'primary' | 'secondary'
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
    children,
    startIcon,
    variant = 'primary',
    type = 'button',
    ...rest
}) => {
    return (
        <CustomButtonContainer $variant={variant} type={type} {...rest}>
            {startIcon && <IconContainer aria-hidden="true">{startIcon}</IconContainer>}

            {children}
        </CustomButtonContainer>
    )
}

export default CustomButton
