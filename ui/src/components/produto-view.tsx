import React from "react";
import { IProdutoViewProps } from "../typings/produto-view";
import Modal from '@mui/material/Modal';
import produtoViewStyles from "../styles/produto-view";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";

const ProdutoView = (props: IProdutoViewProps) => {
	const { produtoId, screenMode, open, onClose } = props;

	const [produto, setProduto] = React.useState();
	const [loading, setLoading] = React.useState(false);
	const [nomeProduto, setNomeProduto] = React.useState('');
	const [descricaoProduto, setDescricaoProduto] = React.useState('');
	const [marcaProduto, setMarcaProduto] = React.useState('');

	return (
		<Modal
			open={open}
			onClose={onClose}
			sx={produtoViewStyles.modal} >
				<Box sx={produtoViewStyles.paper}>
					<Box sx={produtoViewStyles.header}>
						<Typography variant="h5">Produto 1</Typography>
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Box>

					<Box sx={produtoViewStyles.content}>
						<TextField 
							id="nome"
							label="Nome"
							variant="outlined"
							fullWidth
							name="nome"
							value={nomeProduto}
							onChange={(event) => setNomeProduto(event.target.value)}
							disabled={screenMode === 'view'} />
						
						<TextField
							id="descricao"
							label="Descrição"
							variant="outlined"
							fullWidth
							name="descricao"
							value={descricaoProduto}
							onChange={(event) => setDescricaoProduto(event.target.value)}
							disabled={screenMode === 'view'} />

						<TextField
							id="marca"
							label="Marca"
							variant="outlined"
							fullWidth
							name="marca"
							value={marcaProduto}
							onChange={(event) => setMarcaProduto(event.target.value)}
							disabled={screenMode === 'view'} />

					</Box>
					<Box sx={produtoViewStyles.divider} />
					<Box sx={produtoViewStyles.footer}>
						<Button variant="contained" color="warning" disabled={screenMode === 'view'}>
							Excluir
						</Button>
						<Button variant="contained" color="primary" disabled={screenMode === 'view'}>
							Salvar
						</Button>
					</Box>
				</Box>
		</Modal>
	);
}

export default ProdutoView;