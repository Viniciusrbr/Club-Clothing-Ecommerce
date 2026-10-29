import { onAuthStateChanged } from 'firebase/auth'
import {
  FunctionComponent,
  Suspense,
  lazy,
  useContext,
  useEffect,
  useState
} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { collection, getDocs, query, where } from 'firebase/firestore'

// Pages
import HomePage from './pages/home/home.page'

const LoginPage = lazy(() => import('./pages/login/login.page'))
const SignUpPage = lazy(() => import('./pages/sign-up/sign-up.page'))
const ExplorePage = lazy(() => import('./pages/explore/explore.page'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.page'))
const CategoryDetailsPage = lazy(
  () => import('./pages/category-details/category-details.page')
)
const PaymentConfirmationPage = lazy(
  () => import('./pages/payment-confirmation/payment-confirmation.page')
)
const NotFoundPage = lazy(() => import('./pages/not-found/not-found.page'))

// Utilities
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import { userConverter } from './converters/firestore.converters'

// Components
import Loading from './components/loading/loading.component'
import Cart from './components/cart/cart.component'
import AuthenticationGuard from './guards/authentication.guard'

const App: FunctionComponent = () => {
  const [isInitializing, setIsInitializing] = useState(true)

  const { loginUser, logoutUser } = useContext(UserContext)

  // Um único listener durante toda a vida do App; o retorno é o unsubscribe
  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        logoutUser()

        return setIsInitializing(false)
      }

      const querySnapshot = await getDocs(
        query(
          collection(db, 'users').withConverter(userConverter),
          where('id', '==', user.uid)
        )
      )

      const userFromFirestore = querySnapshot.docs[0]?.data()

      loginUser(userFromFirestore)

      return setIsInitializing(false)
    })
  }, [])

  if (isInitializing) return <Loading />

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/category/:id" element={<CategoryDetailsPage />} />
          <Route
            path="/checkout"
            element={
              <AuthenticationGuard>
                <CheckoutPage />
              </AuthenticationGuard>
            }
          />
          <Route
            path="/payment-confirmation"
            element={<PaymentConfirmationPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <Cart />
    </BrowserRouter>
  )
}

export default App