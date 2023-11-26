'use client'
import React from 'react'
import Layout from './Layout'
import AuthRoute from '../libs/AuthRoute'
import { AdminPanel } from '@/components/Admin/AdminPanel'
import '../app/globals.css'
import { AdminFilter } from '@/components/Admin/AdminFilter'

const ProtectedCalendarTable = AuthRoute(AdminFilter)

const Admin = () => {
  return (
    <div>
      <Layout>
        <ProtectedCalendarTable />
      </Layout>
    </div>
  )
}

export default Admin
