import { GridColDef } from "@mui/x-data-grid";

const produtoSchema: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Nome produto", width: 200 },
  { field: "descricao", headerName: "Descrição", width: 300 },
  { field: "marca", headerName: "Marca", width: 150 },
];

export default produtoSchema;