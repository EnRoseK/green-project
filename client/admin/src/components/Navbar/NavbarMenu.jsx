import { Link, useLocation } from 'react-router-dom';

export const NavbarMenu = ({ title = '', onToggle }) => {
  const location = useLocation();

  return (
    <>
      <button className='navbar-toggler' onClick={onToggle}>
        <span className='navbar-toggler-icon'></span>
      </button>
    </>
  );
};
