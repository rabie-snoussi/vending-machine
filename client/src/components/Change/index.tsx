import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import React from 'react';
import { IMAGES } from 'shared/constants';
import locale from 'shared/locale.json';

interface Props {
  change: {
    '5'?: number;
    '10'?: number;
    '20'?: number;
    '50'?: number;
    '100'?: number;
  };
}

const Change: React.FC<Props> = ({ change }) => (
  <Box sx={{ padding: '10px 0' }}>
    <Typography variant="body1" component="div">
      {`${locale.yourChange}:`}
    </Typography>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0',
      }}
    >
      {change['5'] && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img height="50px" src={IMAGES.coin5} alt="coin_5" />
            <Typography variant="h6" component="div">
              {`x ${change['5']}`}
            </Typography>
          </Box>
        </Box>
      )}

      {change['10'] && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img height="50px" src={IMAGES.coin10} alt="coin_10" />
            <Typography variant="h6" component="div">
              {`x ${change['10']}`}
            </Typography>
          </Box>
        </Box>
      )}

      {change['20'] && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img height="50px" src={IMAGES.coin20} alt="coin_20" />
            <Typography variant="h6" component="div">
              {`x ${change['20']}`}
            </Typography>
          </Box>
        </Box>
      )}

      {change['50'] && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img height="50px" src={IMAGES.coin50} alt="coin_50" />
            <Typography variant="h6" component="div">
              {`x ${change['50']}`}
            </Typography>
          </Box>
        </Box>
      )}

      {change['100'] && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img height="50px" src={IMAGES.coin100} alt="coin_100" />
            <Typography variant="h6" component="div">
              {`x ${change['100']}`}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  </Box>
);

export default Change;
