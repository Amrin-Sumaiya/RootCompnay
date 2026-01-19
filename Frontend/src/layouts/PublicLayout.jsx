import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../Pages/company/Navigation'
import Footer from '../Pages/Footer'

const PublicLayout = () => {
  return (
    <>

    <Navigation />

    {/* Dynamic page content     */}
    <main className='pt-16   min-h-screen'>
        <Outlet />

    </main>
    <Footer />
      
    </>
  )
}

export default PublicLayout
