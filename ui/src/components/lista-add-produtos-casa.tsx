import React from 'react';
import axios from 'axios';
import { Box, TextField, Typography } from '@mui/material';
import { IProdutoCasa } from '../typings/produto';
import { IListaAddProdutosCasaProps } from '../typings/lista-add-produtos-casa';
import listaAddProdutosCasaStyles from '../styles/lista-add-produtos-casa';

const ListaAddProdutosCasa = (props: IListaAddProdutosCasaProps) => {
    const { casaId, setProdutosSelecionados } = props;
    const [produtos, setProdutos] = React.useState<IProdutoCasa[]>([
			{
				id: 1,
				nome: 'Arroz',
				marca: 'Tio João',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 2,
				nome: 'Feijão',
				marca: 'Tio João',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 3,
				nome: 'Macarrão',
				marca: 'Adria',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 4,
				nome: 'Café',
				marca: '3 Corações',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 5,
				nome: 'Açúcar',
				marca: 'União',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 6,
				nome: 'Óleo',
				marca: 'Liza',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 7,
				nome: 'Sal',
				marca: 'Cisne',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 8,
				nome: 'Farinha de Trigo',
				marca: 'Dona Benta',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 9,
				nome: 'Farinha de Mandioca',
				marca: 'Yoki',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 10,
				nome: 'Farinha de Mandioca',
				marca: 'Yoki',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 11,
				nome: 'Farinha de Mandioca',
				marca: 'Yoki',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			},
			{
				id: 12,
				nome: 'Farinha de Mandioca',
				marca: 'Yoki',
				quantidadeDesejada: 1,
				quantidadeReal: 0,
			}
		]);
		
    const [checkedProdutos, setCheckedProdutos] = React.useState<number[]>([]);

    React.useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {};

    const handleCheckboxChange = (id: number) => {
        setCheckedProdutos((prevCheckedProdutos) =>
            prevCheckedProdutos.includes(id)
                ? prevCheckedProdutos.filter((produtoId) => produtoId !== id)
                : [...prevCheckedProdutos, id]
        );
    };

    const handleQauntidadeDesejadaChange = (id: number, quantidadeDesejada: number) => {
			let numeroInput = quantidadeDesejada;
			if (quantidadeDesejada < 0) {
				numeroInput = 0;
			}
        setProdutos((prevProdutos) =>
            prevProdutos.map((produto) =>
                produto.id === id ? { ...produto, quantidadeDesejada: numeroInput } : produto
            )
        );
    };

    const handleQauntidadeRealChange = (id: number, quantidadeReal: number) => {
			let numeroInput = quantidadeReal;
			if (quantidadeReal < 0) {
				numeroInput = 0;
			}

        setProdutos((prevProdutos) =>
            prevProdutos.map((produto) =>
                produto.id === id ? { ...produto, quantidadeReal: numeroInput } : produto
            )
        );
    };

    return (
        <Box sx={listaAddProdutosCasaStyles.container}>
						<Box sx={listaAddProdutosCasaStyles.header}>
							<Typography variant="h6" sx={listaAddProdutosCasaStyles.idCampo}>ID</Typography>
							<Typography variant="h6" sx={listaAddProdutosCasaStyles.nomeCampo}>Nome</Typography>
							<Typography variant="h6" sx={listaAddProdutosCasaStyles.marcaCampo}>Marca</Typography>
							<Typography variant="h6" sx={listaAddProdutosCasaStyles.quantidadeDesejadaCampo}>Quantidade Desejada</Typography>
							<Typography variant="h6" sx={listaAddProdutosCasaStyles.quantidadeRealCampo}>Quantidade Real</Typography>
						</Box>

						{produtos.map((produto) => {
							return (
								<Box sx={listaAddProdutosCasaStyles.produto}>
									<Typography variant="body1" sx={listaAddProdutosCasaStyles.idCampo}>{produto.id}</Typography>
									<Typography variant="body1" sx={listaAddProdutosCasaStyles.nomeCampo}>{produto.nome}</Typography>
									<Typography variant="body1" sx={listaAddProdutosCasaStyles.marcaCampo}>{produto.marca}</Typography>
									<TextField type='number' variant='standard' value={produto.quantidadeDesejada} onChange={(event) => handleQauntidadeDesejadaChange(produto.id!, Number(event.target.value))} sx={listaAddProdutosCasaStyles.quantidadeDesejadaCampo} />
									<TextField type='number' variant='standard' value={produto.quantidadeReal} onChange={(event) => handleQauntidadeRealChange(produto.id!, Number(event.target.value))} sx={listaAddProdutosCasaStyles.quantidadeRealCampo} />
								</Box>
							)}) }

				</Box>
    );
};

export default ListaAddProdutosCasa;
