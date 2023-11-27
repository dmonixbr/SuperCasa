import { IStyles } from "../typings/styles";

const produtoViewStyles: IStyles = {
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",

	},
	paper: {
		height: "28rem",
		width: "30rem",
		backgroundColor: "#fff",
		borderRadius: "1rem",
		padding: "2rem",
	},
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	content: {
		mt: "1rem",
		display: "flex",
		flexDirection: "column",
		gap: "2rem",
	},
	footer: {
		mt: "2rem",
		display: "flex",
		justifyContent: "flex-end",
		gap: "2rem",
	},
	divider: {
		mt: "1rem",
		width: "100%",
		border: "1px solid #ccc",

	},
};

export default produtoViewStyles;