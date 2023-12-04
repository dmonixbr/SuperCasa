import React from 'react';
import { IModalAddProdutoProps } from '../typings/modal-add-produto';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import ListaAddProdutosCasa from './lista-add-produtos-casa';
import modalAddProdutoStyles from '../styles/modal-add-produto';
import CloseIcon from '@mui/icons-material/Close';
import { IProdutoCasa } from '../typings/produto';

const ModalAddProduto = (props: IModalAddProdutoProps) => {
	const { open, onClose, casaId, setCasa } = props;

	const [produtosSelecionados, setProdutosSelecionados] = React.useState<IProdutoCasa[]>([]);

	const validaSubmit = () => {
		return false;
	}

	const handleSubmit = () => {
		console.log('submit');
	}
 
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			sx={modalAddProdutoStyles.modal}
			>
			<Box sx={modalAddProdutoStyles.paper}>
				<Box sx={modalAddProdutoStyles.header}>
					<Typography variant="h5">Adicionar produto à casa</Typography>
					<IconButton onClick={() => onClose(false)}>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box sx={modalAddProdutoStyles.content}>
					<ListaAddProdutosCasa casaId={casaId} setProdutosSelecionados={setProdutosSelecionados} />

				</Box>
				<Box sx={modalAddProdutoStyles.divider} />
				<Box sx={modalAddProdutoStyles.footer}>
					<Button
						variant="contained"
						color="primary"
						disabled={validaSubmit()}
						onClick={handleSubmit} >
						Salvar
					</Button>
				</Box>
			</Box>
		</Modal>
	)
};

export default ModalAddProduto;