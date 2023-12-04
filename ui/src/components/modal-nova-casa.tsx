import React from 'react';
import { IModalNovaCasaProps } from '../typings/modal-nova-casa';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import modalNovaCasaStyles from '../styles/modal-nova-casa';
import casaService from '../services/casa-service';

const ModalNovaCasa = (props: IModalNovaCasaProps) => {

	const { open, onClose, setRetornoPaginaCasa } = props;

	const [nomeCasa, setNomeCasa] = React.useState('');
	const [descricaoCasa, setDescricaoCasa] = React.useState('');

	const handleSubmit = async () => {
		const resposta = await casaService.createCasa({
			nome: nomeCasa,
			descricao: descricaoCasa
		});
		setRetornoPaginaCasa(resposta);
		onClose();
	}

	const validaSubmit = () => {
		return !nomeCasa;
	}

	return (
		<Modal open={open} onClose={onClose} sx={modalNovaCasaStyles.modal}>
			<Box sx={modalNovaCasaStyles.paper}>
				<Box sx={modalNovaCasaStyles.header}>
					<Typography variant="h5">Cadastrar nova casa</Typography>
					<IconButton onClick={onClose}>
						<GridCloseIcon />
					</IconButton>
				</Box>

				<Box sx={modalNovaCasaStyles.content}>
					<TextField
						id="nome"
						label="Nome"
						variant="outlined"
						fullWidth
						name="nome"
						value={nomeCasa}
						onChange={(event) => setNomeCasa(event.target.value)}
					/>

					<TextField
						id="descricao"
						label="Descrição"
						variant="outlined"
						fullWidth
						name="descricao"
						value={descricaoCasa}
						onChange={(event) => setDescricaoCasa(event.target.value)}
					/>

				</Box>
				<Box sx={modalNovaCasaStyles.divider} />
				<Box sx={modalNovaCasaStyles.footer}>
					<Button
						variant="contained"
						color="warning"
						onClick={onClose}
					>
						Excluir
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={validaSubmit()}
						onClick={handleSubmit}
					>
						Salvar
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ModalNovaCasa;