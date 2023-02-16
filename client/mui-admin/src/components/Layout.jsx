import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, DrawerHeader } from './Sidebar';

export const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar {...{ open, handleDrawerClose, handleDrawerOpen }} />
      <Sidebar open={open} />
      <Box sx={{ width: '100%' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
