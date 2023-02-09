import { Link } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

const MenuItem = ({ menu, index }) => {
  return (
    <li>
      <Accordion.Item eventKey={index} className={`bg-dark`}>
        <div className='d-flex align-items-center'>
          <Link to={menu.link}>{menu.name}</Link>
          <Accordion.Header />
        </div>
        <Accordion.Body>
          <ul>
            <li>
              <Link to={'#'}>Test</Link>
            </li>
            <li>
              <Link to={'#'}>Test</Link>
            </li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </li>
  );
};

export const Sidebar = ({ menuShow, menus }) => {
  return (
    <div className={`off-menu bg-dark ${menuShow && 'show'}`}>
      <Accordion>
        <ul className='sidebar-menu'>
          <MenuItem menu={{ link: '/', name: 'Home' }} index={0} />
          {menus.map((menu, index) => (
            <MenuItem menu={menu} index={index + 1} />
          ))}
        </ul>
      </Accordion>
    </div>
  );
};
