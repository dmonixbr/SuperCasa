import {ICasa} from '../../../../typings/casa';
type CreateCasaRequest = Omit<ICasa, 'id'| 'produtos'>;

 
export default CreateCasaRequest;