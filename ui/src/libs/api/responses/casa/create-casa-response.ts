import { ICasa } from '../../../../typings/casa';

type CreateCasaResponse = Omit<ICasa, 'produtos'>;

export default CreateCasaResponse;