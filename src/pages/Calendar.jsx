'use client'
import React from 'react'
import Layout from './Layout'
import AuthRoute from '../libs/AuthRoute'
import { CalendarTable } from '@/components/CalendarTable'
import '../app/globals.css'

const ProtectedCalendarTable = AuthRoute(CalendarTable)

const Calendar = () => {
  return (
    <div>
      <Layout>
        <ProtectedCalendarTable />
      </Layout>
    </div>
  )
}

export default Calendar
