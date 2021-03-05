import React from 'react';
//import { FaRegFilePowerpoint } from 'react-icons/fa';
import fire from '../SignIn/fire';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const handleLogout = () => {
  fire.auth().signOut();
}
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
        <NavBtn onClick={handleLogout}>
          <NavBtnLink to='/SignIn'> Logout </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
       
};
//
export default Navbar;