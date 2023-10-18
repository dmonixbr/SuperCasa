import src.Repositories.ProdutoRepository as ProdutoRepository
import src.Services.UserService as UserService
from src.Repositories.UserRepository import User

def getProdutoById(id: int, currentUser: str) -> ProdutoRepository.Produto:
    _validaUsuario(currentUser)
    
    produto = ProdutoRepository.getProdutoById(id)
    if not produto:
        raise ('Produto não existente')
    
    return produto

def getProdutos(currentUser: str) -> list[ProdutoRepository.Produto]:
    _validaUsuario(currentUser)

    return ProdutoRepository.getProdutos()

def createProduto(nome: str, descricao: str, marca: str, currentUser: str) -> ProdutoRepository.Produto:
    user = _validaUsuario(currentUser)
    

    if not nome or not marca:
        raise ValueError('Nome e Marca são obrigatórios!')

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
        raise ValueError('Usuário não encontrado')
