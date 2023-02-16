import { useContext } from 'react';
import { DialogContext } from '../contexts';

export const useDialog = () => {
  const { setTitle, setContent, setOpen, handleSubmit } = useContext(DialogContext);

  const showDialog = (title = '', content = '', cb) => {
    setTitle(title);
    setContent(content);
    handleSubmit.current = () => {
      cb();
      setOpen(false);
    };
    setOpen(true);
  };

  return showDialog;
};
