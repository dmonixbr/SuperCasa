import {ICasa} from '../../../../typings/casa';
type UpdateCasaRequest = Omit<ICasa, 'id' | 'produtos'>;

 
export default UpdateCasaRequest;