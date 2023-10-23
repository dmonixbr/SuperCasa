import src.Repositories.CasaRepository as CasaRepository
import src.Services.UserService as UserService
import src.Repositories.ProdutoRepository as ProdutoRepository
from src.libs.Errors import ResponseException
import src.libs.HttpResponse as HttpResponse

def _validaCasaUsuario(casa: CasaRepository.Casa, userId: int) -> bool:
    if not casa:
        raise ResponseException('Casa não encontrada', HttpResponse.NOT_FOUND, 'Service', 'Casa._validaCasaUsuario')
    
    if casa.createdByUserId != userId:
        raise ResponseException('Casa não pertence ao usuário', HttpResponse.UNAUTHORIZED, 'Service', 'Casa._validaCasaUsuario')
    
    return True

def getCasaById(id: int, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    casa = CasaRepository.getCasaById(id)

    if not user:
        raise ResponseException('Usuário não encontrado', HttpResponse.BAD_REQUEST, 'Service', 'Casa.getCasaById')
    if _validaCasaUsuario(casa, user.id):
        return CasaRepository.getCasaById(id)

def getCasas(currentUser: str) -> list[CasaRepository.Casa]:
    user = UserService.getUserByUsername(currentUser)
    if not user:
        raise ResponseException('Usuário não encontrado', HttpResponse.BAD_REQUEST, 'Service', 'Casa.getCasas')
    return CasaRepository.getCasasUsers(user.id)

def createCasa(nome: str, descricao: str, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    if not nome or not user:
        raise ResponseException('Nome ou usuário são obrigatórios', HttpResponse.BAD_REQUEST, 'Service', 'Casa.createCasa')

    return CasaRepository.createCasa(nome, descricao, user.id)

def updateCasa(id: int, nome: str, descricao: str, currentUser: str) -> CasaRepository.Casa:
    user = UserService.getUserByUsername(currentUser)
    casa = CasaRepository.getCasaById(id)

    if _validaCasaUsuario(casa, user.id) and nome:
        if not descricao:
            return CasaRepository.updateCasa(id, nome, casa.descricao)
        
        return CasaRepository.updateCasa(id, nome, descricao)
    elif not nome:
        raise ResponseException('Nome é obrigatórios', HttpResponse.BAD_REQUEST, 'Service', 'Casa.updateCasa')


def deleteCasa(id: int, currentUser: str) -> CasaRepository.Casa:
    if not id:
        raise ResponseException('Nome é obrigatórios', HttpResponse.BAD_REQUEST, 'Service', 'Casa.deleteCasa')
    
    user = UserService.getUserByUsername(currentUser)
    casa = CasaRepository.getCasaById(id)

    if not user:
        raise ResponseException('Usuário não encontrado', HttpResponse.NOT_FOUND, 'Service', 'Casa.deleteCasa')

    if _validaCasaUsuario(casa, user.id):
        return CasaRepository.deleteCasa(id)

def adicionarProdutoCasa(idCasa: int, idProduto: int, quantidadeDesejada: int, quantidadeReal: int, currentUser: str) -> CasaRepository.Casa:
    if not idCasa or not idProduto:
        raise ResponseException('id da casa ou do produto são obrigatórios!', HttpResponse.BAD_REQUEST, 'Service', 'Casa.adicionarProdutoCasa')
    
    if not quantidadeDesejada and not quantidadeReal:
        raise ResponseException('Quantidade desejada e quantidade real são obrigatórios!', HttpResponse.BAD_REQUEST, 'Service', 'Casa.adicionarProdutoCasa')
    
    if quantidadeDesejada < 1 or quantidadeReal < 0:
        raise ResponseException('Quantidade desejada deve ser maior que 1 e Quantidade real deve ser no mínimo 0', HttpResponse.BAD_REQUEST, 'Service', 'Casa.adicionarProdutoCasa')
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user.id)

    relacao = CasaRepository.getRelacaoProdutoCasa(casa.id, idProduto)
    if relacao and relacao in casa.produtos_associados and relacao.ativo:
        raise ResponseException('Produto já adicionado a lista!', HttpResponse.UNAUTHORIZED, 'Service', 'Casa.adicionarProdutoCasa')


    return CasaRepository.adicionaProdutoCasa(casa, idProduto, quantidadeDesejada, quantidadeReal, relacao)

def removeProdutoCasa(idCasa: int, idProduto: int, currentUser: str) -> CasaRepository.Casa:
    if not idCasa or not idProduto:
        raise ResponseException('Id da casa e do produto são obrigatórios', HttpResponse.BAD_REQUEST, 'Service', 'Casa.removeProdutoCasa')
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user.id)

    produto = ProdutoRepository.getProdutoById(idProduto)
    for produto_as in casa.produtos_associados:
        if produto_as.produto_id == idProduto:
            return CasaRepository.removeProdutoCasa(casa, produto)

    return CasaRepository.removeProdutoCasa(casa, produto)

def somaQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMais: int, currentUser: str) -> CasaRepository.Casa:
    if not idCasa or not idProduto:
        raise ResponseException('Id da casa e do produto são obrigatórios', HttpResponse.BAD_REQUEST, 'Service', 'Casa.somaQuantidadeProduto')
    
    if not quantidadeAMais:
        raise ResponseException('Quantidade à mais é obrigatórias', HttpResponse.BAD_REQUEST, 'Service', 'Casa.somaQuantidadeProduto')
    
    if quantidadeAMais < 1:
        raise ResponseException('Quantidade à mais não pode ser menor que 0', HttpResponse.BAD_REQUEST, 'Service', 'Casa.somaQuantidadeProduto')
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user.id)

    return CasaRepository.somaQuantidadeProduto(idCasa, idProduto, quantidadeAMais)

def subtraiQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMenos: int, currentUser: str) -> CasaRepository.Casa:
    if not idCasa or not idProduto:
        raise ResponseException('Id da casa e do produto são obrigatórios', HttpResponse.BAD_REQUEST, 'Service', 'Casa.subtraiQuantidadeProduto')
    
    if not quantidadeAMenos:
        raise ResponseException('Quantidade à menos é obrigatórias', HttpResponse.BAD_REQUEST, 'Service', 'Casa.subtraiQuantidadeProduto')
    
    if quantidadeAMenos < 1:
        raise ResponseException('Quantidade à menos deve ser maior que 0', HttpResponse.BAD_REQUEST, 'Service', 'Casa.subtraiQuantidadeProduto')
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user.id)

    relacao = CasaRepository.getRelacaoProdutoCasa(idCasa, idProduto)
    if not relacao or not relacao.ativo:
        raise ResponseException('Produto não presente na lista da casa', HttpResponse.NOT_FOUND, 'Service', 'Casa.subtraiQuantidadeProduto')
    
    indexProduto = casa.produtos_associados.index(relacao)
    if casa.produtos_associados[indexProduto].quantidade_real - quantidadeAMenos < 0:
        return CasaRepository.subtraiQuantidadeProduto(relacao, casa, 0)

    return CasaRepository.subtraiQuantidadeProduto(relacao, casa, quantidadeAMenos)

def getRelacaoProdutoCasa(idCasa: int, idProduto: int, currentUser: str) -> CasaRepository.CasaProduto:
    if not idCasa or not idProduto:
        raise ResponseException('Id da casa e do produto são obrigatórios', HttpResponse.BAD_REQUEST, 'Service', 'Casa.getRelacaoProdutoCasa') 
    
    casa = CasaRepository.getCasaById(idCasa)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user.id)

    return CasaRepository.getRelacaoProdutoCasa(idCasa, idProduto)

def updateProdutoCasa(relacao: CasaRepository.CasaProduto, quantidadeDesejada: int, quantidadeReal: int, currentUser: str) -> CasaRepository.Casa:
    if not relacao:
        raise ResponseException('Produto não presente na lista da casa', HttpResponse.NOT_FOUND, 'Service', 'Casa.updateProdutoCasa')
    
    if quantidadeDesejada < 1 or quantidadeReal < 0:
        raise ResponseException('Quantidade desejada não pode ser menor que 1 ou quantidade real não pode ser menor que 0', HttpResponse.BAD_REQUEST, 'Service', 'Casa.updateProdutoCasa')
    
    casa = CasaRepository.getCasaById(relacao.casa_id)
    user = UserService.getUserByUsername(currentUser)
    _validaCasaUsuario(casa, user.id)
    
    return CasaRepository.updateProdutoCasa(casa, relacao, quantidadeDesejada, quantidadeReal)