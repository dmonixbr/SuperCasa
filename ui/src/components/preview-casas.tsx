import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import { ICasa } from '../typings/casa';
import { Box } from '@mui/material';

function createData(casa: ICasa) {
    return { id: casa.id, nome: casa.nome, descricao: casa.descricao, produtos: casa.produtos };
}

const rows = [
    createData({
        id: 0,
        nome: 'Belo Horizonte',
        descricao: 'Casa no bairro castelo',
        produtos: [
            {
                id: 0,
                nome: 'Refrigerante 2L',
                marca: 'Coca-Cola',
                descricao: 'Refrigerante sabor cola com 2L de volume em sua embalagem, hmmmmmm... refrescante',
                quantidadeDesejada: 2,
                quantidadeReal: 0
            },
            {
                id: 3,
                nome: 'Miojo sabor galinha 30g',
                marca: 'Turma da monica',
                descricao: 'Sabor da infancia e da sacanagem',
                quantidadeDesejada: 3,
                quantidadeReal: 1
            }
        ]
    }
    ),
    createData({
        id: 1,
        nome: 'Juiz de Fora',
        descricao: 'Ap na avenida Itamar Franco',
        produtos: [
            {
                id: 1,
                nome: 'Arroz 1kg',
                marca: 'Tio joão',
                descricao: 'Arrozinho para seu almoço, branquinho e delicinha, facinho de fazer, sái soltinho.',
                quantidadeDesejada: 1,
                quantidadeReal: 1
            },
            {
                id: 2,
                nome: 'Detergente 300ml',
                marca: 'Limpol',
                descricao: 'Limpa legal meu',
                quantidadeDesejada: 3,
                quantidadeReal: 1
            }
        ]
    }
    ),
    createData({
        id: 2,
        nome: 'Porto Alegre',
        descricao: 'Casa na avenida Nonoai',
        produtos: [
            {
                id: 4,
                nome: 'Massa de tomate 500g',
                marca: 'Pomarola',
                descricao: 'Arrozinho para seu almoço, branquinho e delicinha, facinho de fazer, sái soltinho.',
                quantidadeDesejada: 1,
                quantidadeReal: 1
            }
        ]
    }
    ),
];

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export const PreviewCasas = () => {
    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1rem',
                gap: '1rem',
                border: '1px solid grey'
            }}>
                <Title>Minhas Casas</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descricao</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <>
                            <TableRow key={row.id}>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.descricao}</TableCell>
                            </TableRow>
                                {
                                !!row.produtos && row.produtos?.length > 0 ? (
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Marca</TableCell>
                                        <TableCell>Descricao</TableCell>
                                        <TableCell>Desejado</TableCell>
                                        <TableCell>Qtd. Real</TableCell>
                                        <TableCell>Diferença</TableCell>
                                    </TableRow>
                                ) : null
                            }
                                 {
                                row.produtos?.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.nome}</TableCell>
                                        <TableCell>{p.marca}</TableCell>
                                        <TableCell>{p.descricao}</TableCell>
                                        <TableCell>{p.quantidadeDesejada}</TableCell>
                                        <TableCell>  {p.quantidadeReal}</TableCell>
                                        <TableCell>{p.quantidadeReal - p.quantidadeDesejada}</TableCell>
                                    </TableRow>
                                ))
                            }
                            </>))}
                    </TableBody>
                </Table>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    Gerenciar minhas casas.
                </Link>
            </Box>
        </React.Fragment>
    );
};