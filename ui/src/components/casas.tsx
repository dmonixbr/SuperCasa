import React from "react";
import PageLayout from "../shared/page-layout";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { ICasa } from "../typings/casa";
import casaService from "../services/casa-service";
import casasStyle from "../styles/casas";
import casaSchema from "../libs/schema/casa";
import ModalNovaCasa from "./modal-nova-casa";
import { useNavigate } from "react-router";

const Casas = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [retornoPaginaCasa, setRetornoPaginaCasa] = React.useState<ICasa | null>(null);
  const [casas, setCasas] = React.useState<ICasa[]>([]);

	const navigate = useNavigate();

  React.useEffect(() => {
    casaService.getCasas().then((casas) => {
      setCasas(casas);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  React.useEffect(() => {
    if (!!retornoPaginaCasa){
      const newCasas = [...casas];
      const index = newCasas.findIndex((produto) => produto.id === retornoPaginaCasa?.id);
  
      if (index === -1) {
        newCasas.push(retornoPaginaCasa);
      } else {
        newCasas[index] = retornoPaginaCasa;
      }
      if(retornoPaginaCasa.deleted) {
        newCasas.splice(index, 1);
      }
  
      setCasas(newCasas);
      setRetornoPaginaCasa(null);
    }
  }, [retornoPaginaCasa]);

	const handleAbrirNovaCasa = () => {
		setModalOpen(true);
	};

	const handleAbrirCasa = (id: number) => {
		navigate(`/casa/${id}`);
	}

	const handleFecharNovoProduto = () => {
		setModalOpen(false);
	}
		

  return (
    <PageLayout>
      <Box sx={casasStyle.container}>
        <Box sx={casasStyle.header}>
          <TextField
            id="outlined-basic"
            label="Pesquisar"
            sx={casasStyle.searchField}
            placeholder="Pesquisar por nome"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handleAbrirNovaCasa} startIcon={<AddIcon />}>
            Nova Casa
          </Button>
        </Box>
        <Box sx={casasStyle.content}>
          <DataGrid
            sx={casasStyle.datagrid}
            rows={casas}
            columns={casaSchema}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            disableRowSelectionOnClick
            onRowClick={(row) => handleAbrirCasa(row.row.id as number)}
          />
        </Box>
      </Box>
			<ModalNovaCasa
				open={modalOpen}
				onClose={handleFecharNovoProduto}
        setRetornoPaginaCasa={setRetornoPaginaCasa} />
    </PageLayout>
  );
};

export default Casas;
