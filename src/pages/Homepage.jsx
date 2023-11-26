'use client'
import React from 'react'
import { Aboutus } from '@/components/Aboutus'

export const Homepage = ({ user }) => {
  return (
    <div>
      <Aboutus user={user} />
    </div>
  )
}
