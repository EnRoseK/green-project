import { useContext } from 'react';
import { DialogContext } from '../contexts';

export const useDialog = () => {
  const { setTitle, setContent, setOpen, setHandleSubmit } = useContext(DialogContext);

  const showDialog = (handleSubmit = () => setOpen(false), title = '', content = '') => {
    setTitle(title);
    setContent(content);
    setHandleSubmit(() => handleSubmit);
    setOpen(true);
  };

  return showDialog;
};
