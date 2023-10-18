import src.Repositories.CasaRepository as CasaRepository
import src.Services.UserService as UserService

def getCasaById(id: int, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    casa = CasaRepository.getCasaById(id)

    if not user:
        raise ValueError('Usuário não encontrado')
    if _validaCasaUsuario(casa, user.id):
        return CasaRepository.getCasaById(id)

def getCasas(currentUser: str) -> list[CasaRepository.Casa]:
    user = UserService.getUserByUsername(currentUser)
    return CasaRepository.getCasasUsers(user.id)

def createCasa(nome: str, descricao: str, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    if not nome or not user:
        raise ValueError('Nome ou usuário são obrigatórios')

    return CasaRepository.createCasa(nome, descricao, user.id)

def updateCasa(id: int, nome: str, descricao: str, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    casa = CasaRepository.getCasaById(id)

    if _validaCasaUsuario(casa, user.id) and nome:
        if not descricao:
            return CasaRepository.updateCasa(id, nome, casa.descricao)
        
        return CasaRepository.updateCasa(id, nome, descricao)
    elif not nome:
        raise ValueError('Nome é obrigatório')


def deleteCasa(id: int, currentUser: str) -> CasaRepository.Casa:
    if not id:
        raise ValueError('Id é obrigatório')
    
    user = UserService.getUserByUsername(currentUser)
    casa = CasaRepository.getCasaById(id)

    if not user:
        raise ValueError('Usuário não encontrado')

    if _validaCasaUsuario(casa, user.id):
        return CasaRepository.deleteCasa(id)

    

def _validaCasaUsuario(casa: CasaRepository.Casa, userId: int) -> bool:
    if not casa:
        raise ValueError('Casa não encontrada')
    
    if casa.createdByUserId != userId:
        raise ValueError('Casa não pertence ao usuário')
    
    return True