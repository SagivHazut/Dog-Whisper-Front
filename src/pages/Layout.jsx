import React, { useEffect, useState } from 'react'
import { Navigation } from '@/pages/Navigation'
import { Suspense } from 'react'

const Layout = ({ children }) => {
  const [router, setRouter] = useState(false)

  useEffect(() => {
    setRouter(window.location.pathname)
  }, [])

  return (
    <div>
      <Suspense fallback={null}>
        <Navigation router={router} />
      </Suspense>

      {children}
    </div>
  )
}

export default Layout
