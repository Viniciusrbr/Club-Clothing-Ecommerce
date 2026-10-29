import axios from 'axios';
import { FunctionComponent, useContext, useState } from 'react';
import { PiLockSimple, PiShoppingBagOpen, PiWarningCircle } from 'react-icons/pi';
import { useNavigate } from 'react-router';

import { CartContext } from '../../contexts/cart.context';
import formatPrice from '../../helpers/format-price';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import Loading from '../loading/loading.component';
import StatusMessage from '../status-message/status-message.component';

import {
  CheckoutContainer,
  CheckoutError,
  CheckoutLayout,
  CheckoutNote,
  CheckoutProducts,
  CheckoutRow,
  CheckoutSummary,
  CheckoutSummaryTitle,
  CheckoutTitle,
  CheckoutTotal,
} from './checkout.styles';

const Checkout: FunctionComponent = () => {
  const { products, productsTotalPrice, productsCount } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const navigate = useNavigate();

  const handleFinishPurchaseClick = async () => {
    try {
      setIsLoading(true);
      setHasError(false);

      const { data } = await axios.post('/.netlify/functions/create-checkout-session', {
        products,
      });

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading message="Redirecionando para o pagamento..." />}

      <CheckoutContainer>
        <CheckoutTitle>Checkout</CheckoutTitle>

        {products.length > 0 ? (
          <CheckoutLayout>
            <CheckoutProducts aria-label="Produtos no carrinho">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </CheckoutProducts>

            <CheckoutSummary aria-labelledby="checkout-summary-title">
              <CheckoutSummaryTitle id="checkout-summary-title">Resumo do pedido</CheckoutSummaryTitle>

              <CheckoutRow>
                <span>{productsCount === 1 ? '1 item' : `${productsCount} itens`}</span>
                <span>{formatPrice(productsTotalPrice)}</span>
              </CheckoutRow>

              <CheckoutTotal>
                <span>Total</span>
                <strong>{formatPrice(productsTotalPrice)}</strong>
              </CheckoutTotal>

              {hasError && (
                <CheckoutError role="alert">
                  <PiWarningCircle aria-hidden="true" />
                  Não foi possível iniciar o pagamento. Tente novamente em alguns instantes.
                </CheckoutError>
              )}

              <CustomButton
                startIcon={<PiLockSimple />}
                onClick={handleFinishPurchaseClick}
                disabled={isLoading}>
                Finalizar compra
              </CustomButton>

              <CheckoutNote>
                Você será levado para a página de pagamento da Stripe.
              </CheckoutNote>
            </CheckoutSummary>
          </CheckoutLayout>
        ) : (
          <StatusMessage
            icon={<PiShoppingBagOpen />}
            title="Seu carrinho está vazio"
            description="Adicione alguns produtos para finalizar uma compra.">
            <CustomButton onClick={() => navigate('/explore')}>Explorar produtos</CustomButton>
          </StatusMessage>
        )}
      </CheckoutContainer>
    </>
  );
};

export default Checkout;
