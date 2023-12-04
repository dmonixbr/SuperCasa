import React from 'react';
import PageLayout from '../shared/page-layout';
import casaDetalhesStyles from '../styles/casa-detalhes';
import { Box, Button, IconButton, InputAdornment, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListaProdutosCasa from './lista-produtos-casa';
import { ICasa } from '../typings/casa';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import ModalAddProduto from './modal-add-produto';

const CasaDetalhes = () => {
	const [casa, setCasa] = React.useState<ICasa | null>(null);
	const [modalOpen, setModalOpen] = React.useState(false);

	const handleAbrirNovoProduto = () => {
		setModalOpen(true);
	}

	const handleFecharNovoProduto = () => {
		setModalOpen(false);
	}

  return (
    <PageLayout>
        <Box sx={casaDetalhesStyles.container}>
					<Box sx={casaDetalhesStyles.header}>
						<Box sx={casaDetalhesStyles.tituloDescricao}>
							<Typography variant="h5">Casa</Typography>
							<Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut nulla vitae massa vulputate elementum a vitae purus. In egestas dolor eget arcu molestie ultrices. Maecenas quis justo sem. Quisque porta at mauris eu pellentesque. Proin feugiat elit sed ligula pulvinar, vel hendrerit elit placerat. Duis sapien erat, lobortis non rhoncus et, malesuada ut eros. Integer urna dolor, feugiat tempor augue nec, elementum tincidunt magna. Donec turpis sem, condimentum ac molestie ut, interdum eu enim. Ut id tortor maximus, consectetur enim a, finibus sapien.</Typography>
						</Box>
							<IconButton>
								<ArrowBackIcon />
							</IconButton>
						</Box>
        </Box>
				<Box sx={casaDetalhesStyles.content}>
					<Box>
						<Typography variant="h6">Produtos</Typography>
						<Box sx={casaDetalhesStyles.subHeader}>
          		<TextField
								id="outlined-basic"
								label="Pesquisar"
								sx={casaDetalhesStyles.searchField}
								placeholder="Pesquisar por nome ou marca"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon />
										</InputAdornment>
									),
								}}
							/>
							<Button variant="contained" color="primary" onClick={handleAbrirNovoProduto} sx={casaDetalhesStyles.botaoAdd} startIcon={<AddIcon />}>
								Adicionar Produto
							</Button>
						</Box>
					</Box>
					<ListaProdutosCasa produtos={[]} setCasa={setCasa} />
				</Box>

				<ModalAddProduto
					open={modalOpen}
					onClose={handleFecharNovoProduto}
					casaId={casa?.id}
					setCasa={setCasa} />
    </PageLayout>
  )
}

export default CasaDetalhes