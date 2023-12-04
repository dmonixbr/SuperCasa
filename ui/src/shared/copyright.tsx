import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface ICopyrightProps {
  styles: {[key:string]: string | number}
}

const Copyright = (props: ICopyrightProps) => {
  const {styles} = props;
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={styles}>
        {'Testes de software © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default Copyright;