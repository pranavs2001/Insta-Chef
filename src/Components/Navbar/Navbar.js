import React from 'react';
//import { FaRegFilePowerpoint } from 'react-icons/fa';
import logo from "../../img/insta-chef-logo.png"
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
          <img src={logo} alt={"Insta-chef logo"} width={"70px"} height={"70px"} />
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