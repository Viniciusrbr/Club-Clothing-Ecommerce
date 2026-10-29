import styled from 'styled-components'
import Colors from '../theme/theme.colors'
import Tokens from '../theme/theme.tokens'

// Estilos compartilhados pelas páginas de login e cadastro
export const AuthContainer = styled.main`
  display: flex;
  justify-content: center;
  padding: clamp(40px, 8vw, 96px) 16px clamp(56px, 10vw, 120px);
`

export const AuthContent = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`

export const AuthHeadline = styled.h1`
  font-family: ${Tokens.fonts.display};
  font-size: clamp(2.5rem, 6vw, 3.25rem);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${Colors.text.dark};
`

export const AuthSubtitle = styled.p`
  margin: 12px 0 32px;
  color: ${Colors.text.muted};
`

export const AuthDivider = styled.p`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 28px 0;
  font-size: 0.875rem;
  color: ${Colors.text.muted};
  white-space: nowrap;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${Colors.border};
  }
`

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;

  button[type='submit'] {
    margin-top: 8px;
  }
`

export const AuthFieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 12px;

  @media (max-width: ${Tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`

export const AuthField = styled.div`
  width: 100%;
`

export const AuthLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${Colors.text.dark};
`

export const AuthFooter = styled.p`
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid ${Colors.border};
  text-align: center;
  font-size: 0.9375rem;
  color: ${Colors.text.muted};

  a {
    color: ${Colors.text.dark};
    font-weight: 500;
    text-underline-offset: 4px;
  }
`
