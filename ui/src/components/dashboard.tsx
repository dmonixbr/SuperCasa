import React from 'react';
import Box from '@mui/material/Box';
import PageLayout from '../shared/page-layout';
import { PreviewProdutos } from './preview-produtos';
import { PreviewCasas } from './preview-casas';

const Dashboard = () => {
  return(
    <PageLayout>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <PreviewProdutos />
        <PreviewCasas />
      </Box>
    </PageLayout>
  )
};

export default Dashboard;