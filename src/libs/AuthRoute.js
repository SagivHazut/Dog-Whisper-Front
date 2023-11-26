import { useEffect } from 'react'
import { useRouter } from 'next/router'

const AuthRoute = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter()

    useEffect(() => {
      const storedUserData = localStorage.getItem('user')
      if (!storedUserData) {
        router.push('/SignIn')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return WithAuth
}

export default AuthRoute
