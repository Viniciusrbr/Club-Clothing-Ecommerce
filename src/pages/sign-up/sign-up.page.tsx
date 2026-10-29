import { PiUserPlus } from 'react-icons/pi'
import { useForm } from 'react-hook-form'
import isEmail from 'validator/es/lib/isEmail'
import { Link, useNavigate } from 'react-router'
import { useContext, useEffect, useState } from 'react'

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
    AuthField,
    AuthFieldRow,
    AuthFooter,
    AuthForm,
    AuthHeadline,
    AuthLabel,
    AuthSubtitle
} from '../auth.styles'

// Firebase
import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../config/firebase.config'
import { addDoc, collection } from 'firebase/firestore'

import { UserContext } from '../../contexts/user.context'
interface SignUpForm {
    fistName: string
    lastName: string
    email: string
    password: string
    passwordConfirmation: string
}

const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors }
    } = useForm<SignUpForm>()

    const [isLoading, setIsLoading] = useState(false)

    const watchPassword = watch('password')

    const { isAuthenticated } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    const handleSubmitPress = async (data: SignUpForm) => {
        try {
            setIsLoading(true)
            const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password)

            await addDoc(collection(db, 'users'), {
                id: userCredentials.user.uid,
                email: userCredentials.user.email,
                firstName: data.fistName,
                lastName: data.lastName,
                provider: 'firebase'
            })
        } catch (error) {
            const _error = error as AuthError

            if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
                return setError('email', { type: 'alreadyInUse' })
            }
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
                    <AuthHeadline>Crie sua conta</AuthHeadline>
                    <AuthSubtitle>Leva menos de um minuto.</AuthSubtitle>

                    <AuthForm noValidate onSubmit={handleSubmit(handleSubmitPress)}>
                        <AuthFieldRow>
                            <AuthField>
                                <AuthLabel htmlFor="sign-up-first-name">Nome</AuthLabel>
                                <CustomInput
                                    id="sign-up-first-name"
                                    autoComplete="given-name"
                                    hasError={!!errors?.fistName}
                                    placeholder="Seu nome"
                                    {...register('fistName', { required: true })}
                                />

                                {errors?.fistName?.type === 'required' && (
                                    <InputErrorMessage>O nome é obrigatório.</InputErrorMessage>
                                )}
                            </AuthField>

                            <AuthField>
                                <AuthLabel htmlFor="sign-up-last-name">Sobrenome</AuthLabel>
                                <CustomInput
                                    id="sign-up-last-name"
                                    autoComplete="family-name"
                                    hasError={!!errors?.lastName}
                                    placeholder="Seu sobrenome"
                                    {...register('lastName', { required: true })}
                                />

                                {errors?.lastName?.type === 'required' && (
                                    <InputErrorMessage>O sobrenome é obrigatório.</InputErrorMessage>
                                )}
                            </AuthField>
                        </AuthFieldRow>

                        <AuthField>
                            <AuthLabel htmlFor="sign-up-email">E-mail</AuthLabel>
                            <CustomInput
                                id="sign-up-email"
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

                            {errors?.email?.type === 'alreadyInUse' && (
                                <InputErrorMessage>Este email já está sendo utilizado.</InputErrorMessage>
                            )}

                            {errors?.email?.type === 'validate' && (
                                <InputErrorMessage>
                                    Por favor, insira um e-mail válido.
                                </InputErrorMessage>
                            )}
                        </AuthField>

                        <AuthField>
                            <AuthLabel htmlFor="sign-up-password">Senha</AuthLabel>
                            <CustomInput
                                id="sign-up-password"
                                type="password"
                                autoComplete="new-password"
                                hasError={!!errors?.password}
                                placeholder="No mínimo 6 caracteres"
                                {...register('password', { required: true, minLength: 6 })}
                            />

                            {errors?.password?.type === 'required' && (
                                <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
                            )}

                            {errors?.password?.type === 'minLength' && (
                                <InputErrorMessage>
                                    A senha precisa ter no mínimo 6 caracteres.
                                </InputErrorMessage>
                            )}
                        </AuthField>

                        <AuthField>
                            <AuthLabel htmlFor="sign-up-password-confirmation">
                                Confirmação de senha
                            </AuthLabel>
                            <CustomInput
                                id="sign-up-password-confirmation"
                                type="password"
                                autoComplete="new-password"
                                hasError={!!errors?.passwordConfirmation}
                                placeholder="Digite a senha novamente"
                                {...register('passwordConfirmation', {
                                    required: true,
                                    minLength: 6,
                                    validate: (value) => {
                                        return value === watchPassword
                                    }
                                })}
                            />

                            {errors?.passwordConfirmation?.type === 'required' && (
                                <InputErrorMessage>
                                    A confirmação de senha é obrigatória.
                                </InputErrorMessage>
                            )}

                            {errors?.passwordConfirmation?.type === 'minLength' && (
                                <InputErrorMessage>
                                    A confirmação de senha precisa ter no mínimo 6 caracteres.
                                </InputErrorMessage>
                            )}

                            {errors?.passwordConfirmation?.type === 'validate' && (
                                <InputErrorMessage>
                                    A confirmação de senha precisa ser igual a senha.
                                </InputErrorMessage>
                            )}
                        </AuthField>

                        <CustomButton type="submit" startIcon={<PiUserPlus />}>
                            Criar conta
                        </CustomButton>
                    </AuthForm>

                    <AuthFooter>
                        Já tem uma conta? <Link to="/login">Entrar</Link>
                    </AuthFooter>
                </AuthContent>
            </AuthContainer>
        </>
    )
}

export default SignUpPage
