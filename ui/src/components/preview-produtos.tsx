import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import { Box } from '@mui/material';

function createData(
  id: number,
  nome: string,
  marca: string,
  descricao: string
) {
  return { id, nome, marca, descricao };
}

const rows = [
  createData(
    0,
    'Refrigerante 2L',
    'Coca-Cola',
    'Refrigerante sabor cola com 2L de volume em sua embalagem, hmmmmmm... refrescante'
  ),
  createData(
    1,
    'Arroz 1kg',
    'Tio João',
    'Arrozinho para seu almoço, branquinho e delicinha, facinho de fazer, sái soltinho.'
  ),
  createData(2, 'Detergente 300ml', 'Limpol', 'Limpa legal meu'),
  createData(
    3,
    'Miojo sabor galinha 30g',
    'Turma da monica',
    'Sabor da infancia e da sacanagem',
  ),
  createData(
    4,
    'Massa de tomate 500g',
    'Pomarola',
    'Massa de tomate para fazer molhos es afins.',
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export const PreviewProdutos = () => {
  return (
    <React.Fragment>
      <Box sx={{
        display: 'flex',
        flexDirection:'column',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1rem',
        gap: '1rem',
        border: '1px solid grey'
      }}>
        <Title>Produtos recem adicionados</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Descricao</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.marca}</TableCell>
                <TableCell>{row.descricao}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          Ver mais produtos.
        </Link>
      </Box>
    </React.Fragment>
  );
};