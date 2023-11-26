import React from 'react'
import Layout from './Layout'
import Register from '@/components/Register'
import '../app/globals.css'
import { AuthRoute } from '../libs/AuthRoute'

const ProtectedCalendarTable = AuthRoute(Register)

const SignUp = () => {
  return (
    <Layout>
      <ProtectedCalendarTable />
    </Layout>
  )
}
export default SignUp
