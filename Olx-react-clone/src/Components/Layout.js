import React from 'react'
import Header from '../Components/Header/Header'
import Footer from './Footer/Footer'


function Layout({children}) {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <Footer/>    
    </div>
  )
}

export default Layout