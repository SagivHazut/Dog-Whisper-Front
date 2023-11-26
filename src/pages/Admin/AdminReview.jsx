'use client'
import React from 'react'
import Layout from '../Layout'
import { AuthRouteForAdmin } from '../../libs/AuthRoute'
import '../../app/globals.css'
import { ReviewPanel } from '@/components/Admin/ReviewPanel'

const ProtectedCalendarTable = AuthRouteForAdmin(ReviewPanel)

const AdminReview = () => {
  return (
    <div>
      <Layout>
        <ProtectedCalendarTable />
      </Layout>
    </div>
  )
}

export default AdminReview
