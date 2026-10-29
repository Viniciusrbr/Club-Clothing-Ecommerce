import { FunctionComponent, Suspense } from 'react'
import { Outlet } from 'react-router'

// Components
import Header from '../header/header.component'

const Layout: FunctionComponent = () => {
    return (
        <>
            <Header />

            <Suspense fallback={null}>
                <Outlet />
            </Suspense>
        </>
    )
}

export default Layout
