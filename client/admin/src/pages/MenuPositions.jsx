import { useEffect } from 'react';
import { useState } from 'react';
import { Heading } from '../components/Heading';
import { MenuPositionList } from '../components/Menu/Positions/PositionList';
import axios from 'axios';
import { MenuPositionCreate } from '../components/Menu/Positions/PositionCreate';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

export const MenuPositions = () => {
  const [positions, setPositions] = useState([]);
  const { setModalContent, setModalTitle, setModalShow, modalClose } = useContext(ModalContext);

  useEffect(async () => {
    axios.get('http://localhost:8000/menu-positions').then((res) => {
      setPositions(res.data);
    });
  }, []);

  const showCreateModal = () => {
    setModalContent(<MenuPositionCreate afterSubmit={afterSubmit} />);
    setModalTitle('Create Menu Position');
    setModalShow(true);
  };

  const afterSubmit = (position) => {
    modalClose();
    const newPositions = [...positions, position];
    setPositions(newPositions);
  };

  return (
    <>
      <div className='container-sm body-container'>
        <Heading title='Menu positions' handleShow={showCreateModal} />
        <MenuPositionList items={positions} />
      </div>
    </>
  );
};
