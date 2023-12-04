import src.Services.ProdutoService as ProdutoService
import src.Repositories.UserRepository as UserRepository
import pytest
from src import create_app, db

@pytest.fixture
def app():
    app = create_app('test')
    app_context = app.app_context()
    app_context.push()
    
    db.create_all()
    yield app

    db.session.remove()
    db.drop_all()
    app_context.pop()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def user():
    user = UserRepository.createUser(username="User Teste", password="123456")
    return user

def test_create_produto(client, user):
    produto = ProdutoService.createProduto("Produto 1", "Produto 1", "Marca", user.username)
    assert produto.nome == "Produto 1"
    assert produto.descricao == "Produto 1"
    assert produto.createdByUserId == 1

def test_create_produto_without_name(client, user):
    with pytest.raises(Exception):
        produto = ProdutoService.createProduto("", "Produto 1", "Marca", user.username)

def test_update_produto(client, user):
    produto = ProdutoService.createProduto("Produto 1", "Produto 1", "Marca", user.username)
    produto = ProdutoService.updateProduto(produto.id, "Produto 2", "Produto 2", "Marca", user.username)
    assert produto.nome == "Produto 2"
    assert produto.descricao == "Produto 2"

def test_delete_produto(client, user):
    produto = ProdutoService.createProduto("Produto 1", "Produto 1", "Marca", user.username)
    produto = ProdutoService.deleteProduto(produto.id, user.username)
    assert produto.nome == "Produto 1"
    assert produto.descricao == "Produto 1"

def test_get_produto_by_id(client, user):
    produto = ProdutoService.createProduto("Produto 1", "Produto 1", "Marca", user.username)
    produto = ProdutoService.getProdutoById(produto.id, user.username)
    assert produto.nome == "Produto 1"
    assert produto.descricao == "Produto 1"

def test_get_produto_by_id_not_found(client, user):
    with pytest.raises(Exception):
        produto = ProdutoService.getProdutoById(1, user.username)

def test_get_produtos(client, user):
    produto = ProdutoService.createProduto("Produto 1", "Produto 1", "Marca", user.username)
    produtos = ProdutoService.getProdutos(user.username)
    assert len(produtos) == 1
    assert produtos[0].nome == "Produto 1"
    assert produtos[0].descricao == "Produto 1"

def test_valida_usuario(client, user):
    usuario = ProdutoService._validaUsuario(user.username)
    assert usuario.username == "User Teste"

def test_valida_usuario_not_found(client, user):
    with pytest.raises(Exception):
        usuario = ProdutoService._validaUsuario("User Teste 2")