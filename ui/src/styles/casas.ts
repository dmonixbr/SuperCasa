import { IStyles } from "../typings/styles";

const casasStyles: IStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    gap: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    width: "100%",
  },
  searchField: {
    width: "20rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  datagrid: {
    ".MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-row:hover": {
      cursor: "pointer",
    },
  },
};

export default casasStyles;
