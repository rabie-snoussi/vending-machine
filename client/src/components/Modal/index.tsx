import ModalUI from '@mui/material/Modal';
import Box from '@mui/material/Box';

import React from 'react';

interface Props {
  children: React.ReactElement | [React.ReactElement];
}

const Modal: React.FC<Props> = ({ children }) => (
  <ModalUI
    open
    sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
  >
    <Box
      sx={{
        background: 'white',
        p: 2,
      }}
    >
      {children}
    </Box>
  </ModalUI>
);

export default Modal;
