import { useEffect } from 'react'
import { useRouter } from 'next/router'

//Auth for if there is no user its will redirect the user to sign in
export const AuthNoUserRoute = (WrappedComponent) => {
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

//Auth for if there a user its wont let him to go the login route
export const AuthRoute = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter()

    useEffect(() => {
      const storedUserData = localStorage.getItem('user')
      if (storedUserData) {
        router.push('/')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return WithAuth
}
//Auth for  if the user are not admin
export const AuthRouteForAdmin = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter()

    useEffect(() => {
      const storedUserData = localStorage.getItem('user')
      const parsedUser = JSON.parse(storedUserData)

      if (!parsedUser.admin) {
        router.push('/')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return WithAuth
}
