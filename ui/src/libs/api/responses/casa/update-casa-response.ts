import { ICasa } from '../../../../typings/casa';

type UpdateCasaResponse = Omit<ICasa, 'produtos'>;

export default UpdateCasaResponse;