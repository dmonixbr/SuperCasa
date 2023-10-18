import src.Repositories.CasaRepository as CasaRepository
import src.Services.UserService as UserService
import src.Repositories.ProdutoRepository as ProdutoRepository

def _validaCasaUsuario(casa: CasaRepository.Casa, userId: int) -> bool:
    if not casa:
        raise ValueError('Casa não encontrada')
    
    if casa.createdByUserId != userId:
        raise ValueError('Casa não pertence ao usuário')
    
    return True

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

def adicionarProdutoCasa(idCasa: int, idProduto: int, quantidadeDesejada: int, quantidadeReal: int, currentUser: str) -> CasaRepository.Casa:
    if not idCasa or not idProduto:
        raise ValueError('Id da casa e do produto são obrigatórios')
    
    if not quantidadeDesejada and not quantidadeReal:
        raise ValueError('Quantidade desejada ou real são obrigatórias')
    
    if quantidadeDesejada < 1 or quantidadeReal < 0:
        raise ValueError('Quantidade desejada não pode ser menor que 1 ou quantidade real não pode ser menor que 0')
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user)

    return CasaRepository.adicionaProdutoCasa(idCasa, idProduto, quantidadeDesejada, quantidadeReal)

def somaQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMais: int, currentUser: str) -> CasaRepository.Casa:
    if not idCasa or not idProduto:
        raise ValueError('Id da casa e do produto são obrigatórios')
    
    if not quantidadeAMais:
        raise ValueError('Quantidade à mais é obrigatórias')
    
    if quantidadeAMais < 1:
        raise ValueError('Quantidade à mais não pode ser menor que 0')
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user)

    return CasaRepository.somaQuantidadeProduto(idCasa, idProduto, quantidadeAMais)

def subtraiQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMenos: int, currentUser: str) -> CasaRepository.Casa:
    if not idCasa or not idProduto:
        raise ValueError('Id da casa e do produto são obrigatórios')
    
    if not quantidadeAMenos:
        raise ValueError('Quantidade à menos é obrigatórias')
    
    if quantidadeAMenos < 1:
        raise ValueError('Quantidade à menos não pode ser menor que 0')
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user)

    produto = ProdutoRepository.getProdutoById(idProduto)
    if produto not in casa.produtos:
        raise ValueError('Produto não presente na lista da casa')
    
    indexProduto = casa.produtos.index(produto)
    if casa.produtos[indexProduto].quantidade_real - quantidadeAMenos < 0:
        return CasaRepository.somaQuantidadeProduto(idCasa, idProduto, 0)

    return CasaRepository.somaQuantidadeProduto(idCasa, idProduto, quantidadeAMenos)