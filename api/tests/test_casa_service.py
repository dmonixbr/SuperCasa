import src.Services.CasaService as CasaService
import src.Repositories.ProdutoRepository as ProdutoRepository
from src.libs.Errors import ResponseException
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

def test_create_casa_sucesso(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"
    assert casa.createdByUserId == 1

def test_create_casa_sem_nome(client, user):
    with pytest.raises(ResponseException) as exc_info:
        CasaService.createCasa("", "Casa 1", user.username)

    assert exc_info.value.mensagem == "Nome ou usuário são obrigatórios"

def test_create_casa_sem_usuario(client, user):
    with pytest.raises(ResponseException) as exec_info:
        CasaService.createCasa("Casa 1", "Casa 1", "")
        
    assert exec_info.value.mensagem == "Nome ou usuário são obrigatórios"


def test_update_casa_sucesso(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    casa = CasaService.updateCasa(casa.id, "Casa 2", "Casa 2", user.username)
    assert casa.nome == "Casa 2"
    assert casa.descricao == "Casa 2"

def test_update_casa_sem_nome(client, user):
    with pytest.raises(ResponseException) as exc_info:
        casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
        casa = CasaService.updateCasa(casa.id, "", "Casa 2", user.username)

    assert exc_info.value.mensagem == "Nome é obrigatórios"

def test_delete_casa_sucesso(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    casa = CasaService.deleteCasa(casa.id, user.username)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"

def test_delete_casa_sem_id(client, user):
    with pytest.raises(ResponseException) as exc_info:
        casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
        casa = CasaService.deleteCasa("", user.username)

    assert exc_info.value.mensagem == "Id é obrigatórios"

def test_delete_casa_sem_usuario(client, user):
    with pytest.raises(ResponseException) as exc_info:
        casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
        casa = CasaService.deleteCasa(casa.id, "")

    assert exc_info.value.mensagem == "Usuário não encontrado"

def test_get_casa_by_id_sucesso(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    casa = CasaService.getCasaById(casa.id, user.username)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"

def test_get_casa_by_id_sem_usuario(client, user):
    with pytest.raises(ResponseException) as exc_info:
        casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
        casa = CasaService.getCasaById(casa.id, "")

    assert exc_info.value.mensagem == "Usuário não encontrado"

def test_get_casas(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    casas = CasaService.getCasas(user.username)
    assert len(casas) == 1
    assert casas[0].nome == "Casa 1"
    assert casas[0].descricao == "Casa 1"

def test_adicionar_produto_casa(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "Marca", user.id)
    casa = CasaService.adicionarProdutoCasa(casa.id, produto.id, 1, 1, user.username)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 1

def test_remover_produto_casa(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "Marca", user.id)
    casa = CasaService.adicionarProdutoCasa(casa.id, produto.id, 1, 1, user.username)
    casa = CasaService.removeProdutoCasa(casa.id, produto.id, user.username)
    lista_produtos = [produto for produto in casa.produtos_associados if produto.ativo]
    assert len(lista_produtos) == 0

def test_soma_quantidade_produto(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "Marca", user.id)
    casa = CasaService.adicionarProdutoCasa(casa.id, produto.id, 1, 1, user.username)
    casa = CasaService.somaQuantidadeProduto(casa.id, produto.id, 1, user.username)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 2

def test_subtrai_quantidade_produto(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "Marca", user.id)
    casa = CasaService.adicionarProdutoCasa(casa.id, produto.id, 1, 1, user.username)
    casa = CasaService.subtraiQuantidadeProduto(casa.id, produto.id, 1, user.username)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 0

def test_update_produto_casa(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "Marca", user.id)
    casa = CasaService.adicionarProdutoCasa(casa.id, produto.id, 1, 1, user.username)
    relacao = CasaService.getRelacaoProdutoCasa(casa.id, produto.id, user.username)
    casa = CasaService.updateProdutoCasa(relacao, 2, 2, user.username)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].quantidade_desejada == 2
    assert casa.produtos_associados[0].quantidade_real == 2


