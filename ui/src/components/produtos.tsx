import React from "react";
import PageLayout from "../shared/page-layout";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import produtosStyles from '../styles/produtos';
import produtoSchema from '../libs/schema/produto';
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { IProduto } from "../typings/produto";

const Produtos = () => {
  const [produtos, setProdutos] = React.useState<IProduto[]>([{id: 1, nome: 'Produto 1', descricao: 'produtooooooo',marca: 'Marca 1'}]);

  const dataGrid = React.useRef<typeof DataGrid | null>(null);

  return (
    <PageLayout>
      <Box sx={produtosStyles.container}>
        <Box sx={produtosStyles.header}>
          <TextField
            id="outlined-basic"
            label="Pesquisar"
            sx={produtosStyles.searchField}
            placeholder="Pesquisar por nome ou marca"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Novo Produto
          </Button>
        </Box>
        <Box sx={produtosStyles.content}>
          <DataGrid 
            sx={produtosStyles.datagrid}
            rows={produtos} 
            columns={produtoSchema}
            initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
            }}
            disableRowSelectionOnClick
            onRowClick={(row) => console.log(row)}
       />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default Produtos;
