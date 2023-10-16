import src.Repositories.CasaRepository as CasaRepository
import src.Services.UserService as UserService

def getCasaById(id) -> CasaRepository.Casa:
    return CasaRepository.getCasaById(id)

def getCasas() -> list[CasaRepository.Casa]:
    return CasaRepository.getCasas()

def createCasa(nome: str, descricao: str, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    if not nome or not user:
        raise ValueError('Nome ou usuário são obrigatórios')

    return CasaRepository.createCasa(nome, descricao, user.id)

def updateCasa(id: int, nome: str, descricao: str) -> CasaRepository.Casa:
    if not nome or id:
        raise ValueError('Nome ou id são obrigatórios')
    
    return CasaRepository.updateCasa(id, nome, descricao)

def deleteCasa(id: int) -> CasaRepository.Casa:
    if not id:
        raise ValueError('Id é obrigatório')
    
    return CasaRepository.deleteCasa(id)