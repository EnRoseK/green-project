import { createContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useRef } from 'react';

export const DialogContext = createContext(null);

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleSubmit = useRef(() => {});

  const handleClose = () => setOpen(false);

  return (
    <DialogContext.Provider value={{ setTitle, setContent, setOpen, handleSubmit }}>
      {children}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit.current} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
};
