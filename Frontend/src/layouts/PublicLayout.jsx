import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../Pages/company/Navigation'
import PageArticles from '../Pages/PageArticles'
import Footer from '../Pages/Footer'

const PublicLayout = () => {
  return (
    <>
    <Navigation />

    {/* Dynamic page content     */}
    <main className='pt-16   min-h-screen'>
        <Outlet />
    </main>

    <PageArticles />
    <Footer />
     
    </>
  )
}

export default PublicLayout
