import { useNavigate } from 'react-router'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import StatusMessage from '../../components/status-message/status-message.component'

// Styles
import { NotFoundCode, NotFoundContainer } from './not-found.styles'

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <NotFoundContainer id="conteudo">
            <NotFoundCode aria-hidden="true">404</NotFoundCode>

            <StatusMessage
                title="Página não encontrada"
                description="O endereço pode ter mudado ou não existe mais.">
                <CustomButton onClick={() => navigate('/explore')}>
                    Explorar produtos
                </CustomButton>
                <CustomButton variant="secondary" onClick={() => navigate('/')}>
                    Voltar para o início
                </CustomButton>
            </StatusMessage>
        </NotFoundContainer>
    )
}

export default NotFoundPage
