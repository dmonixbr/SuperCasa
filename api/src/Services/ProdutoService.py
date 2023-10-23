import src.Repositories.ProdutoRepository as ProdutoRepository
import src.Services.UserService as UserService
from src.Repositories.UserRepository import User
from src.libs.Errors import ResponseException
import src.libs.HttpResponse as HttpResponse

def getProdutoById(id: int, currentUser: str) -> ProdutoRepository.Produto:
    _validaUsuario(currentUser)
    
    produto = ProdutoRepository.getProdutoById(id)
    if not produto:
        raise ResponseException('Produto não existente', HttpResponse.NOT_FOUND, 'Service', 'Produto.getProdutoById')
    
    return produto

def getProdutos(currentUser: str) -> list[ProdutoRepository.Produto]:
    _validaUsuario(currentUser)

    return ProdutoRepository.getProdutos()

def createProduto(nome: str, descricao: str, marca: str, currentUser: str) -> ProdutoRepository.Produto:
    user = _validaUsuario(currentUser)
    

    if not nome or not marca:
        raise ResponseException('Nome e Marca são obrigatórios!', HttpResponse.BAD_REQUEST, 'Service', 'Produto.createProduto')

    return ProdutoRepository.createProduto(nome, descricao, marca, user.id)

def updateProduto(id: int, nome: str, descricao: str, marca: str, currentUser: str) -> ProdutoRepository.Produto:
    _validaUsuario(currentUser)

    return ProdutoRepository.updateProduto(id, nome, descricao, marca)

def deleteProduto(id: int, currentUser: str) -> ProdutoRepository.Produto:
    _validaUsuario(currentUser)

    return ProdutoRepository.deleteProduto(id)


def _validaUsuario(userName: str) -> User:
    user = UserService.getUserByUsername(userName)

    if user:
        return user
    else:
        raise ResponseException('Usuário não encontrado', HttpResponse.NOT_FOUND, 'Service', 'Produto._validaUsuario')
