import React from 'react'
import Layout from './Layout'
import Login from '@/components/Login'
import '../app/globals.css'
import { AuthRoute } from '../libs/AuthRoute'

const ProtectedCalendarTable = AuthRoute(Login)

const SignIn = () => {
  return (
    <Layout>
      <ProtectedCalendarTable />
    </Layout>
  )
}
export default SignIn
