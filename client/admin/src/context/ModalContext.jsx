import { createContext, useState } from 'react';
import { DynamicModal } from '../components/utils/DynamicModal';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(<></>);
  const [modalTitle, setModalTitle] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const modalClose = () => {
    setModalContent();
    setModalShow(false);
  };

  return (
    <ModalContext.Provider value={{ setModalContent, setModalTitle, setModalShow, modalClose }}>
      {children}
      <DynamicModal show={modalShow} handleClose={modalClose} title={modalTitle} content={modalContent} />
    </ModalContext.Provider>
  );
};
