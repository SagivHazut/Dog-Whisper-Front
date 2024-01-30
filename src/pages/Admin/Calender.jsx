'use client'
import React from 'react'
import Layout from '../Layout'
import { AuthRouteForAdmin } from '../../libs/AuthRoute'
import '../../app/globals.css'
import { CalenderControl } from '@/components/Admin/CalenderControl'

const ProtectedCalendarTable = AuthRouteForAdmin(CalenderControl)

const Calender = () => {
  return (
    <div>
      <Layout>
        <ProtectedCalendarTable />
      </Layout>
    </div>
  )
}

export default Calender
