import { PiGoogleLogo, PiSignIn } from 'react-icons/pi'
import { useForm } from 'react-hook-form'
import validator from 'validator'
import { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'

// Components
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import Header from '../../components/header/header.component'
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
    AuthHeadline,
    AuthLabel,
    AuthSubtitle
} from '../auth.styles'

// Firebase
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

import {
    AuthError,
    AuthErrorCodes,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth'

import { auth, db, googleProvider } from '../../config/firebase.config'
import { UserContext } from '../../contexts/user.context'

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

    const { isAuthenticated } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const handleSubmitPress = async (data: LoginForm) => {
        try {
            setIsLoading(true)
            await signInWithEmailAndPassword(auth, data.email, data.password)
        } catch (error) {
            const _error = error as AuthError

            if (_error.code === AuthErrorCodes.INVALID_PASSWORD) {
                return setError('password', { type: 'mismatch' })
            }

            if (_error.code === AuthErrorCodes.USER_DELETED) {
                return setError('email', { type: 'notFound' })
            }
            if (_error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
                setError('email', { type: 'invalid' })
                setError('password', { type: 'invalid' })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleSignInWithGooglePress = async () => {
        try {
            setIsLoading(true)
            const userCredentials = await signInWithPopup(auth, googleProvider)

            const querySnapshot = await getDocs(
                query(
                    collection(db, 'users'),
                    where('id', '==', userCredentials.user.uid)
                )
            )

            const user = querySnapshot.docs[0]?.data()

            if (!user) {
                const firstName = userCredentials.user.displayName?.split(' ')[0]
                const lastName = userCredentials.user.displayName?.split(' ')[1]

                await addDoc(collection(db, 'users'), {
                    id: userCredentials.user.uid,
                    email: userCredentials.user.email,
                    firstName,
                    lastName,
                    provider: 'google'
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />

            {isLoading && <Loading />}

            <AuthContainer id="conteudo">
                <AuthContent>
                    <AuthHeadline>Entre com a sua conta</AuthHeadline>
                    <AuthSubtitle>Acesse seu carrinho e finalize suas compras.</AuthSubtitle>

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
                                        return validator.isEmail(value)
                                    }
                                })}
                            />

                            {errors?.email?.type === 'required' && (
                                <InputErrorMessage>O e-mail é obrigatório.</InputErrorMessage>
                            )}

                            {errors?.email?.type === 'notFound' && (
                                <InputErrorMessage>
                                    O e-mail não foi encontrado.
                                </InputErrorMessage>
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

                            {errors?.password?.type === 'mismatch' && (
                                <InputErrorMessage>A senha é inválida.</InputErrorMessage>
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
                        Ainda não tem uma conta? <Link to="/sign-up">Criar conta</Link>
                    </AuthFooter>
                </AuthContent>
            </AuthContainer>
        </>
    )
}

export default LoginPage
