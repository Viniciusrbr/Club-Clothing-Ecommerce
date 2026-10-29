import { FirebaseError } from 'firebase/app'
import { AuthErrorCodes } from 'firebase/auth'

const DEFAULT_MESSAGE =
    'Não foi possível concluir. Tente novamente em alguns instantes.'

const messagesByCode: Record<string, string | null> = {
    [AuthErrorCodes.NETWORK_REQUEST_FAILED]:
        'Sem conexão com a internet. Verifique sua rede e tente novamente.',
    [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]:
        'Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.',
    [AuthErrorCodes.USER_DISABLED]: 'Esta conta foi desativada.',
    [AuthErrorCodes.POPUP_BLOCKED]:
        'O navegador bloqueou a janela do Google. Permita pop-ups para este site e tente novamente.',
    [AuthErrorCodes.POPUP_CLOSED_BY_USER]: null,
    [AuthErrorCodes.EXPIRED_POPUP_REQUEST]: null,
    [AuthErrorCodes.USER_CANCELLED]: null
}

export const getAuthErrorCode = (error: unknown) =>
    error instanceof FirebaseError ? error.code : undefined

const getAuthErrorMessage = (error: unknown): string | null => {
    const code = getAuthErrorCode(error)

    if (code && code in messagesByCode) return messagesByCode[code]

    return DEFAULT_MESSAGE
}

export default getAuthErrorMessage
