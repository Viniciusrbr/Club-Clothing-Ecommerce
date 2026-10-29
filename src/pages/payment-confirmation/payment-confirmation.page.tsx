import { FunctionComponent, useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { PiCheckCircle, PiXCircle } from 'react-icons/pi'

// Styles
import { PaymentConfirmationContainer } from './payment-confirmation.styles'

// Components
import Header from '../../components/header/header.component'
import CustomButton from '../../components/custom-button/custom-button.component'
import StatusMessage from '../../components/status-message/status-message.component'

// Utilities
import { CartActionsContext } from '../../contexts/cart.context'

const PaymentConfirmationPage: FunctionComponent = () => {
    const { clearProducts, toggleCart } = useContext(CartActionsContext)

    const [searchParams] = useSearchParams()

    const navigate = useNavigate()

    const status = searchParams.get('success')
    const isCanceled = searchParams.get('canceled') === 'true'
    const hasFailed = status === 'false' || isCanceled

    useEffect(() => {
        if (status === 'true') {
            clearProducts()
        }
    }, [status, clearProducts])

    const handleGoToHomePageClick = () => {
        navigate('/')
    }

    return (
        <>
            <Header />
            <PaymentConfirmationContainer id="conteudo">
                {status === 'true' && (
                    <StatusMessage
                        tone="success"
                        icon={<PiCheckCircle />}
                        title="Compra confirmada"
                        description="Recebemos seu pagamento. Obrigado por comprar na Club Clothing.">
                        <CustomButton onClick={handleGoToHomePageClick}>
                            Voltar para o início
                        </CustomButton>
                    </StatusMessage>
                )}

                {hasFailed && (
                    <StatusMessage
                        tone="error"
                        icon={<PiXCircle />}
                        title="Não foi possível finalizar a compra"
                        description="Seus produtos continuam no carrinho. Tente novamente quando quiser.">
                        <CustomButton onClick={toggleCart}>Abrir carrinho</CustomButton>
                        <CustomButton variant="secondary" onClick={handleGoToHomePageClick}>
                            Voltar para o início
                        </CustomButton>
                    </StatusMessage>
                )}

                {status !== 'true' && !hasFailed && (
                    <StatusMessage
                        title="Nenhum pagamento em andamento"
                        description="Volte para a loja para continuar comprando.">
                        <CustomButton onClick={handleGoToHomePageClick}>
                            Voltar para o início
                        </CustomButton>
                    </StatusMessage>
                )}
            </PaymentConfirmationContainer>
        </>
    )
}

export default PaymentConfirmationPage
