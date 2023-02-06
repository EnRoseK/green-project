import { Heading } from '../components/Heading';
import { DynamicModal } from '../components/utils/DynamicModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CategoryEdit } from '../components/Categories/CategoryEdit';
import { useParams } from 'react-router-dom';
import { MenuList } from '../components/Menu/MenuList';
import { MenuCreate } from '../components/Menu/MenuCreate';

export const Menus = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalTitle, setModalTitle] = useState('');
  const [position, setPosition] = useState(null);
  const [menus, setMenus] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/menu-positions/${id}`).then((res) => setPosition(res.data));

    axios
      .get(`http://localhost:8000/menus?positionId=${id}`)
      .then((res) => setMenus(res.data))
      .catch((err) => toast.error(`Алдаа гарлаа`));
  }, []);

  const afterSubmit = (menu) => {
    modalClose();
    const newMenus = [...menus, menu];
    setMenus(newMenus);
  };

  const modalClose = () => {
    setModalContent();
    setModalShow(false);
  };

  const showCreateModal = () => {
    setModalContent(<MenuCreate afterSubmit={afterSubmit} positionId={id} />);
    setModalTitle('Create Menu');
    setModalShow(true);
  };

  return (
    <>
      <div className='container-sm body-container'>
        <Heading title={`"${position?.name}" - Menus`} handleShow={showCreateModal} />
        <MenuList items={menus} />
      </div>
      <DynamicModal show={modalShow} handleClose={modalClose} title={modalTitle} content={modalContent} />
    </>
  );
};
