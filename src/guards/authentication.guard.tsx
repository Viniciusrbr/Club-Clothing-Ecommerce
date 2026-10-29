import { ReactNode, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

// Utilities
import { UserContext } from '../contexts/user.context'

// Components
import Loading from '../components/loading/loading.component'

function AuthenticationGuard({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useContext(UserContext)

    const navigate = useNavigate()
    const { pathname, search } = useLocation()

    useEffect(() => {
        if (isAuthenticated) return

        const timeout = setTimeout(() => {
            navigate('/login', {
                replace: true,
                state: { from: `${pathname}${search}` }
            })
        }, 3000)

        return () => clearTimeout(timeout)
    }, [isAuthenticated, navigate, pathname, search])

    if (!isAuthenticated) {
        return (
            <Loading message="Você precisa estar logado para acessar esta página. Você será redirecionado para a página de login em instantes..." />
        )
    }

    return <>{children}</>
}

export default AuthenticationGuard