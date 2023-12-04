import { GridColDef } from "@mui/x-data-grid";

const casaSchema: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Nome casa", width: 200 },
  { field: "descricao", headerName: "Descrição", width: 300 },
];

export default casaSchema;