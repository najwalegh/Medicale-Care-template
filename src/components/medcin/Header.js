import React from 'react'
import logo from '../assets/logo.png'

function Header() {
  return (
    <header className='py-8'>
    <div className='container mx-auto'>
      <div className='flex justify-between items-center'>
        {/* {LOGO} */}
        <a href='#'>
          <img src={logo} alt='logo' style={{width:60}}></img>
        </a>
        <div>
        {/* {button} */}
        <button className='btn btn-sm'>Connexion</button>
        <button className='btn btn-sm'>Inscription</button>
        </div>

      </div>
    </div>
  </header>
  )
}

export default Header