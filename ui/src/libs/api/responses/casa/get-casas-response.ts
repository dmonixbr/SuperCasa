import {ICasa} from '../../../../typings/casa';

type GetCasasResponse = Omit<ICasa[], 'produtos'>;

export default GetCasasResponse;