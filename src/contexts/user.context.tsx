import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import User from "../types/user.types";

interface IUserContext {
    currentUser: User | null
    isAuthenticated: boolean
    loginUser: (user: User) => void
    logoutUser: () => void
}

export const UserContext = createContext<IUserContext>({
    currentUser: null,
    isAuthenticated: false,
    loginUser: () => { },
    logoutUser: () => { }
})

const UserContextProvider = ({ children }: { children: ReactNode }) => {

    const [currentUser, setCurrentUser] = useState<User | null>(null)

    const loginUser = useCallback((user: User) => {
        setCurrentUser(user)
    }, [])

    const logoutUser = useCallback(() => {
        setCurrentUser(null)
    }, [])

    const value = useMemo(
        () => ({
            currentUser,
            isAuthenticated: currentUser !== null,
            loginUser,
            logoutUser
        }),
        [currentUser, loginUser, logoutUser]
    )

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
