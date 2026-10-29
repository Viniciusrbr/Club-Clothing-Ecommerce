import React, { FunctionComponent } from 'react'

// Styles
import {
    StatusMessageActions,
    StatusMessageContainer,
    StatusMessageIcon,
    StatusMessageText,
    StatusMessageTitle
} from './status-message.styles'

interface StatusMessageProps {
    icon?: React.ReactNode
    title: string
    description?: string
    tone?: 'neutral' | 'success' | 'error'
    children?: React.ReactNode
}

// Bloco usado para estados vazios, de erro e de confirmação
const StatusMessage: FunctionComponent<StatusMessageProps> = ({
    icon,
    title,
    description,
    tone = 'neutral',
    children
}) => {
    return (
        <StatusMessageContainer>
            {icon && (
                <StatusMessageIcon $tone={tone} aria-hidden="true">
                    {icon}
                </StatusMessageIcon>
            )}

            <StatusMessageTitle>{title}</StatusMessageTitle>

            {description && <StatusMessageText>{description}</StatusMessageText>}

            {children && <StatusMessageActions>{children}</StatusMessageActions>}
        </StatusMessageContainer>
    )
}

export default StatusMessage
