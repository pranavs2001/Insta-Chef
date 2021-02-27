import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
         Home
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/Search' activeStyle>
            Search
          </NavLink>
          <NavLink to='/Pantry' activeStyle>
            Pantry
          </NavLink>
          <NavLink to='/Profile' activeStyle>
            Profile
          </NavLink>
          {/* <NavLink to='/sign-up' activeStyle>
            Sign Up
          </NavLink> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/Login'>Sign In/ Sign Up</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;