import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import React from 'react';
import locale from 'shared/locale.json';

interface Props {
  onDeposit: Function;
  deposit: number;
  onReset: Function;
}

const DepositButtons: React.FC<Props> = ({ deposit, onDeposit, onReset }) => (
  <Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      {`${deposit} ${locale.cents.toLowerCase()}`}
    </Box>

    <Box sx={{ display: 'flex' }}>
      <Box sx={{ padding: '0 10px' }}>
        <Button
          sx={{ background: 'orange', '&:hover': { background: 'orange' } }}
          variant="contained"
          onClick={() => onReset()}
        >
          {locale.reset}
        </Button>
      </Box>

      <Box sx={{ padding: '0 10px' }}>
        <Button variant="contained" onClick={() => onDeposit()}>
          {locale.deposit}
        </Button>
      </Box>
    </Box>
  </Box>
);

export default DepositButtons;
