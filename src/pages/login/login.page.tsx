import { PiGoogleLogo, PiSignIn, PiWarningCircle } from 'react-icons/pi'
import { useForm } from 'react-hook-form'
import isEmail from 'validator/es/lib/isEmail'
import { useEffect, useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import InputErrorMessage from '../../components/input-error-message/input-error-message.component'
import Loading from '../../components/loading/loading.component'

// Styles
import {
    AuthContainer,
    AuthContent,
    AuthDivider,
    AuthField,
    AuthFooter,
    AuthForm,
    AuthFormError,
    AuthHeadline,
    AuthLabel,
    AuthSubtitle
} from '../auth.styles'

// Firebase
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

import {
    AuthErrorCodes,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth'

import { auth, db, googleProvider } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'
import getAuthErrorMessage, { getAuthErrorCode } from '../../helpers/auth-error-message'
import User from '../../types/user.types'

const INVALID_CREDENTIALS_CODES: string[] = [
    AuthErrorCodes.INVALID_LOGIN_CREDENTIALS,
    AuthErrorCodes.INVALID_PASSWORD,
    AuthErrorCodes.USER_DELETED
]

interface LoginForm {
    email: string
    password: string
}

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<LoginForm>()

    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const { isAuthenticated, loginUser } = useContext(UserContext)

    const navigate = useNavigate()
    const location = useLocation()

    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/'

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirectTo, { replace: true })
        }
    }, [isAuthenticated, navigate, redirectTo])

    const handleSubmitPress = async (data: LoginForm) => {
        try {
            setIsLoading(true)
            setFormError(null)
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            if (INVALID_CREDENTIALS_CODES.includes(getAuthErrorCode(error) ?? '')) {
                setError('email', { type: 'invalid' })
                setError('password', { type: 'invalid' })
                return
            }

            console.error(error)
            setFormError(getAuthErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInWithGooglePress = async () => {
        try {
            setIsLoading(true)
            setFormError(null)
            const userCredentials = await signInWithPopup(auth, googleProvider)

            const querySnapshot = await getDocs(
                query(
                    collection(db, 'users'),
                    where('id', '==', userCredentials.user.uid)
                )
            )

            const user = querySnapshot.docs[0]?.data()

            if (!user) {
                const [firstName = '', ...lastNameParts] =
                    userCredentials.user.displayName?.split(' ') ?? []

                const newUser: User = {
                    id: userCredentials.user.uid,
                    email: userCredentials.user.email ?? '',
                    firstName,
                    lastName: lastNameParts.join(' '),
                    provider: 'google'
                }

                await addDoc(collection(db, 'users'), newUser)

                loginUser(newUser)
            }
        } catch (error) {
            console.error(error)
            setFormError(getAuthErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && <Loading />}

            <AuthContainer id="conteudo">
                <AuthContent>
                    <AuthHeadline>Entre com a sua conta</AuthHeadline>
                    <AuthSubtitle>Acesse seu carrinho e finalize suas compras.</AuthSubtitle>

                    {formError && (
                        <AuthFormError role="alert">
                            <PiWarningCircle aria-hidden="true" />
                            {formError}
                        </AuthFormError>
                    )}

                    <CustomButton
                        variant="secondary"
                        startIcon={<PiGoogleLogo />}
                        onClick={handleSignInWithGooglePress}>
                        Entrar com o Google
                    </CustomButton>

                    <AuthDivider>ou entre com o seu e-mail</AuthDivider>

                    <AuthForm noValidate onSubmit={handleSubmit(handleSubmitPress)}>
                        <AuthField>
                            <AuthLabel htmlFor="login-email">E-mail</AuthLabel>
                            <CustomInput
                                id="login-email"
                                type="email"
                                autoComplete="email"
                                hasError={!!errors?.email}
                                placeholder="voce@email.com"
                                {...register('email', {
                                    required: true,
                                    validate: (value) => {
                                        return isEmail(value)
                                    }
                                })}
                            />

                            {errors?.email?.type === 'required' && (
                                <InputErrorMessage>O e-mail é obrigatório.</InputErrorMessage>
                            )}

                            {errors?.email?.type === 'invalid' && (
                                <InputErrorMessage>
                                    Usuário e/ou senha inválidos.
                                </InputErrorMessage>
                            )}

                            {errors?.email?.type === 'validate' && (
                                <InputErrorMessage>
                                    Por favor, insira um e-mail válido.
                                </InputErrorMessage>
                            )}
                        </AuthField>

                        <AuthField>
                            <AuthLabel htmlFor="login-password">Senha</AuthLabel>
                            <CustomInput
                                id="login-password"
                                type="password"
                                autoComplete="current-password"
                                hasError={!!errors?.password}
                                placeholder="Digite sua senha"
                                {...register('password', { required: true })}
                            />

                            {errors?.password?.type === 'required' && (
                                <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
                            )}

                            {errors?.password?.type === 'invalid' && (
                                <InputErrorMessage>
                                    Usuário e/ou senha inválidos.
                                </InputErrorMessage>
                            )}
                        </AuthField>

                        <CustomButton type="submit" startIcon={<PiSignIn />}>
                            Entrar
                        </CustomButton>
                    </AuthForm>

                    <AuthFooter>
                        Ainda não tem uma conta?{' '}
                        <Link to="/sign-up" state={location.state}>
                            Criar conta
                        </Link>
                    </AuthFooter>
                </AuthContent>
            </AuthContainer>
        </>
    )
}

export default LoginPage
