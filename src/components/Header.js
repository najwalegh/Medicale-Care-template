import React from 'react'
import logo from '../assets/logo.png'

function Header() {
  return (
    <header className=''>
    <div className='container mx-auto'>
      <div className='flex justify-between items-center'>
        {/* {LOGO} */}
        <a href='#'>
          <img src={logo} alt='logo' style={{width:80}}></img>
        </a>
        <div>
        {/* {button} */}
        <button className=' btn-lg'>Connexion</button>
        <button className='btn-lg'>Inscription</button>
        </div>

      </div>
    </div>
  </header>
  )
}

export default Header