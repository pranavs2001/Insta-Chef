import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import { NavLink } from './NavbarElements'
import logo from "../../img/insta-chef-logo.png"
import fire from '../SignIn/fire';
import './Button.css';

const handleLogout = () => {
    fire.auth().signOut();
  }

function Navbar2() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };




function Button() {
  return (
    <Link onClick= {handleLogout}>
      <button className='btn'>Logout</button>
    </Link>
  );
}
  return (
    <>
      <nav className='navbar'>
      <NavLink to='/'>
          <img src={logo} alt={"Insta-chef logo"} width={"70px"} height={"70px"} onClick={closeMobileMenu}  />
        </NavLink>
        {/* <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          EPIC
          <i class='fab fa-firstdraft' />
        </Link> */}
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {/* <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li> */}
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/Profile'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Profile <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/Pantry'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Pantry
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/Search'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar2;