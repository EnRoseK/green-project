import { Heading } from '../components/Heading';
import { DynamicModal } from '../components/utils/DynamicModal';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { MenuList } from '../components/Menu/MenuList';
import { MenuCreate } from '../components/Menu/MenuCreate';
import { ModalContext } from '../context/ModalContext';

export const Menus = () => {
  const { setModalContent, setModalTitle, setModalShow, modalClose } = useContext(ModalContext);

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
    </>
  );
};
