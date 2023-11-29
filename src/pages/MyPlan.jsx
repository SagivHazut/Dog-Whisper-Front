'use client'
import '../app/globals.css'
import React from 'react'
import Layout from './Layout'
import { AuthNoUserRoute } from '../libs/AuthRoute'
import { MyPlanInfo } from '@/components/MyPlanInfo'

const ProtectedCalendarTable = AuthNoUserRoute(MyPlanInfo)

export const MyPlan = () => {
  return (
    <Layout>
      <ProtectedCalendarTable />
    </Layout>
  )
}
export default MyPlan
