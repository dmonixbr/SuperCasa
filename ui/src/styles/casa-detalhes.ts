import { IStyles } from "../typings/styles";

const casaDetalhesStyles: IStyles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '2rem',
		borderRadius: '0.5rem',
		padding: '1rem',
		border: '1px solid #ccc',
		height: '100%',
	},
	header: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	tituloDescricao: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '1rem',
		gap: '2rem',
		borderRadius: '0.5rem',
		padding: '1rem',
		border: '1px solid #ccc',
		height: '100%',
	},
	subHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: '2rem'
	},
	botaoAdd: {
		height: '56px',
	},

};

export default casaDetalhesStyles;