import React from "react";
import { IProdutoViewProps } from "../typings/produto-view";
import Modal from "@mui/material/Modal";
import produtoViewStyles from "../styles/produto-view";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import produtoService from "../services/produto-service";
import { IProduto } from "../typings/produto";

const ProdutoView = (props: IProdutoViewProps) => {
	const { produtoId, screenMode, open, onClose, setRetornoProdutoModal, setScreenMode } = props;

	const [loading, setLoading] = React.useState(false);
	const [nomeProduto, setNomeProduto] = React.useState("");
	const [descricaoProduto, setDescricaoProduto] = React.useState<
		string | undefined
	>("");
	const [marcaProduto, setMarcaProduto] = React.useState("");

	React.useEffect(() => {
		if (!produtoId) return;

		produtoService
			.getProduto(produtoId)
			.then((produto) => {
				setNomeProduto(produto.nome);
				setDescricaoProduto(produto?.descricao);
				setMarcaProduto(produto.marca);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [produtoId]);

	const handleSubmit = () => {
		setLoading(true);

		const produtoDoc: IProduto = {
			id: produtoId ? produtoId : undefined,
			nome: nomeProduto,
			descricao: descricaoProduto,
			marca: marcaProduto,
		};

		if (screenMode === "create") {
			produtoService
				.createProduto(produtoDoc)
				.then((produto) => {
					setRetornoProdutoModal(produto);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
					onClose();
				});
		} else if (screenMode === "edit") {
			produtoService
				.updateProduto(produtoId!, produtoDoc)
				.then((produto) => {
					setRetornoProdutoModal(produto);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
					onClose();
				});
		}

		setDescricaoProduto("");
		setNomeProduto("");
		setMarcaProduto("");

	};

	const handleDelete = () => {
		setLoading(true);

		produtoService
			.deleteProduto(produtoId!)
			.then((produto) => {
				setRetornoProdutoModal({ ...produto, deleted: true });
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
				onClose();
			});

			setDescricaoProduto("");
			setNomeProduto("");
			setMarcaProduto("");
	};

	const validaSubmit = () => {
		return !nomeProduto || !marcaProduto || loading;
	}

	return (
		<Modal open={open} onClose={onClose} sx={produtoViewStyles.modal}>
			<Box sx={produtoViewStyles.paper}>
				<Box sx={produtoViewStyles.header}>
					<Typography variant="h5">{screenMode === 'create' ? 'Cadastrar novo produto' : screenMode === 'edit' ? 'Editar Produto' : nomeProduto}</Typography>
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
						disabled={screenMode === "view"}
					/>

					<TextField
						id="descricao"
						label="Descrição"
						variant="outlined"
						fullWidth
						name="descricao"
						value={descricaoProduto}
						onChange={(event) => setDescricaoProduto(event.target.value)}
						disabled={screenMode === "view"}
					/>

					<TextField
						id="marca"
						label="Marca"
						variant="outlined"
						fullWidth
						name="marca"
						value={marcaProduto}
						onChange={(event) => setMarcaProduto(event.target.value)}
						disabled={screenMode === "view"}
					/>
				</Box>
				<Box sx={produtoViewStyles.divider} />
				<Box sx={produtoViewStyles.footer}>
					<Button
						variant="contained"
						color="warning"
						disabled={screenMode === "create"}
						onClick={handleDelete}
					>
						Excluir
					</Button>
					<Button
						variant="contained"
						color="primary"
						disabled={validaSubmit()}
						onClick={() => {
							if (screenMode === "view") {
								setScreenMode("edit");
							} else {
								handleSubmit();
							}
						}}
					>
						{screenMode === "view" ? "Editar" : "Salvar"}
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ProdutoView;
