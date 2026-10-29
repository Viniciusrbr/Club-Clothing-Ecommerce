import styled from 'styled-components'
import Colors from '../../theme/theme.colors'
import Tokens from '../../theme/theme.tokens'

export const CheckoutContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(32px, 5vw, 64px) clamp(16px, 4vw, 40px) clamp(56px, 8vw, 104px);
`

export const CheckoutTitle = styled.h1`
  font-family: ${Tokens.fonts.display};
  font-size: clamp(2.75rem, 6vw, 4rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${Colors.text.dark};
  margin-bottom: clamp(24px, 4vw, 40px);
`

export const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  align-items: start;
  gap: clamp(32px, 5vw, 64px);

  @media (max-width: ${Tokens.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`

export const CheckoutProducts = styled.section`
  border-top: 1px solid ${Colors.border};
  border-bottom: 1px solid ${Colors.border};
`

export const CheckoutSummary = styled.aside`
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  border-radius: ${Tokens.radius.lg};
  background-color: ${Colors.background.surface};

  @media (max-width: ${Tokens.breakpoints.lg}) {
    position: static;
  }
`

export const CheckoutSummaryTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${Colors.text.dark};
`

export const CheckoutRow = styled.p`
  display: flex;
  justify-content: space-between;
  color: ${Colors.text.muted};
  font-variant-numeric: tabular-nums;
`

export const CheckoutTotal = styled.p`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid ${Colors.border};
  color: ${Colors.text.dark};
  font-weight: 500;

  strong {
    font-size: 1.5rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
`

export const CheckoutError = styled.p`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border-radius: ${Tokens.radius.sm};
  background-color: rgba(179, 38, 30, 0.08);
  color: ${Colors.error};
  font-size: 0.875rem;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`

export const CheckoutNote = styled.p`
  font-size: 0.8125rem;
  text-align: center;
  color: ${Colors.text.muted};
`
