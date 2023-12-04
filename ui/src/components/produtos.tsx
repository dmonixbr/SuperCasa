import React from "react";
import PageLayout from "../shared/page-layout";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import produtosStyles from "../styles/produtos";
import produtoSchema from "../libs/schema/produto";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { IProduto } from "../typings/produto";
import ProdutoView from "./produto-view";
import PrdoutoService from "../services/produto-service";

const Produtos = () => {
	const [modalOpen, setModalOpen] = React.useState(false);
	const [modalScreenMode, setModalScreenMode] = React.useState<"view" | "edit" | "create">("create");
	const [modalProdutoId, setModalProdutoId] = React.useState<number | null>(null);
  const [retornoProdutoModal, setRetornoProdutoModal] = React.useState<IProduto | null>(null);
  const [produtos, setProdutos] = React.useState<IProduto[]>([]);

  React.useEffect(() => {
    PrdoutoService.getProdutos().then((produtos) => {
      setProdutos(produtos);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  React.useEffect(() => {
    if (!!retornoProdutoModal){
      const newProdutos = [...produtos];
      const index = newProdutos.findIndex((produto) => produto.id === retornoProdutoModal?.id);
  
      if (index === -1) {
        newProdutos.push(retornoProdutoModal);
      } else {
        newProdutos[index] = retornoProdutoModal;
      }
      if(retornoProdutoModal.deleted) {
        newProdutos.splice(index, 1);
      }
  
      setProdutos(newProdutos);
      setRetornoProdutoModal(null);
    }
  }, [retornoProdutoModal]);

	const handleAbrirNovoProduto = () => {
		setModalOpen(true);
	};

	const handleAbrirProduto = (produtoId: number) => {
		setModalScreenMode("view");
		setModalProdutoId(produtoId);
		setModalOpen(true);
	};

	const handleFecharNovoProduto = () => {
		setModalOpen(false);
		setModalScreenMode("create");
		setModalProdutoId(null);
	}
		

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
          <Button variant="contained" color="primary" onClick={handleAbrirNovoProduto} startIcon={<AddIcon />}>
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
            onRowClick={(row) => handleAbrirProduto(row.row.id as number)}
          />
        </Box>
      </Box>
			<ProdutoView
				open={modalOpen}
				screenMode={modalScreenMode}
				produtoId={modalProdutoId}
				onClose={handleFecharNovoProduto}
        setRetornoProdutoModal={setRetornoProdutoModal}
        setScreenMode={setModalScreenMode} />
    </PageLayout>
  );
};

export default Produtos;
