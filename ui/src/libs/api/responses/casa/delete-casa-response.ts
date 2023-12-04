import { ICasa } from '../../../../typings/casa';

type DeleteCasaResponse = Omit<ICasa, 'produtos'>;

export default DeleteCasaResponse;