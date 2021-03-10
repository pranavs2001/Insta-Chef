import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

const MenuItems = [
    {
      title: 'My Account',
      path: '/Profile',
      cName: 'dropdown-link'
    },
    {
      title: 'Favorites',
      path: '/Favorites',
      cName: 'dropdown-link'
    },
    
  ];



function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;