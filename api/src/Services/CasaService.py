import src.Repositories.CasaRepository as CasaRepository
import src.Services.UserService as UserService

def getCasaById(id: int, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    if not user:
        raise ValueError('Usuário não encontrado')
    if _validaCasaUsuario(id, user.id):
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
    if _validaCasaUsuario(id, user.id) and nome:
        return CasaRepository.updateCasa(id, nome, descricao)
    elif not nome:
        raise ValueError('Nome é obrigatório')


def deleteCasa(id: int) -> CasaRepository.Casa:
    if not id:
        raise ValueError('Id é obrigatório')
    
    return CasaRepository.deleteCasa(id)

def _validaCasaUsuario(casaId: int, userId: int) -> bool:
    casa = getCasaById(casaId)
    if not casa:
        raise ValueError('Casa não encontrada')
    
    if casa.createdByUserId != userId:
        raise ValueError('Casa não pertence ao usuário')
    
    return True