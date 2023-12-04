import { IStyles } from "../typings/styles";

const listaAddProdutosCasaStyles: IStyles = {
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowY: "scroll",
        height: "22rem"
    },
    header:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottom: "1px solid #ccc",
    },
    idCampo: {
        width: "10%",
    },
    nomeCampo: {
        width: "35%",
    },
    marcaCampo: {
        width: "20%",
    },
    quantidadeDesejadaCampo: {
        width: "20%",
    },
    quantidadeRealCampo: {
        width: "15%",
    },
    linhaProduto: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottom: "1px solid #ccc",
    },
    produto: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }

};

export default listaAddProdutosCasaStyles;