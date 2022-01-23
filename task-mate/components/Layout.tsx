import React, { FC } from 'react'
import Link from 'next/link'

const Layout: FC = ({ children }) => {
  return (
    <div className="page">
      <Link href="/">
        <a className="logo">
          <img src="/logo.png" alt="logo" />
        </a>
      </Link>
      {children}
    </div>
  )
}

export default Layout
