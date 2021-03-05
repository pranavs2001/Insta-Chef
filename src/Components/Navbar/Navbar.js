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
        </NavMenu>
        <NavBtn onClick={handleLogout}>
          <NavBtnLink to='/'> Logout </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
       
};
//
export default Navbar;