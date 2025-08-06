import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
<Box
  component="footer"
  sx={{
    py: 2,
    px: 3,
    backgroundColor: (theme) =>
      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    borderTop: (theme) =>
      `1px solid ${theme.palette.divider}`,
    textAlign: 'center',
  }}
>
  <Typography
    variant="body2"
    color="text.secondary"
  >
    © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
  </Typography>
</Box>
  );
};

export default Footer;