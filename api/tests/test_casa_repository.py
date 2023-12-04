import src.Repositories.CasaRepository as CasaRepository
import src.Repositories.ProdutoRepository as ProdutoRepository
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


def test_create_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"
    assert casa.createdByUserId == 1

def test_update_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.updateCasa(casa.id, "Casa 2", "Casa 2")
    assert casa.nome == "Casa 2"
    assert casa.descricao == "Casa 2"

def test_delete_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.deleteCasa(casa.id)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"

def test_get_casa_by_id(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.getCasaById(casa.id)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"
    assert casa.getProdutos() == []

def test_adiciona_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 1, 1, None)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 1
    assert casa.getProdutos() == [{
        "id": produto.id,
        "nome": produto.nome,
        "marca": produto.marca,
        "descricao": produto.descricao,
        "quantidade_desejada": 1,
        "quantidade_real": 1
    }]

def test_adiciona_produto_casa_existente(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 1, 1, None)
    casa = CasaRepository.removeProdutoCasa(casa, produto)
    relacao = CasaRepository.getRelacaoProdutoCasa(casa.id, produto.id)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 2, 0, relacao)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 2
    assert casa.produtos_associados[0].quantidade_real == 0

def test_soma_quantidade_produto(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 1, 1, None)
    casa = CasaRepository.somaQuantidadeProduto(casa.id, produto.id, 1)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 2

def test_subtrai_quantidade_produto(client):   
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 2)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 1, 1, None)
    casa = CasaRepository.subtraiQuantidadeProduto(casa.produtos_associados[0], casa, 1)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 0

def test_remove_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 1, 1, None)
    casa = CasaRepository.removeProdutoCasa(casa, produto)
    lista_produtos = [produto for produto in casa.produtos_associados if produto.ativo]
    assert len(lista_produtos) == 0

def test_update_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 1, 1, None)
    relacao = CasaRepository.getRelacaoProdutoCasa(casa.id, produto.id)
    casa = CasaRepository.updateProdutoCasa(casa, relacao, 2, 2)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == produto.id
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 2
    assert casa.produtos_associados[0].quantidade_real == 2

def test_get_relacao_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, produto.id, 1, 1, None)
    relacao = CasaRepository.getRelacaoProdutoCasa(casa.id, produto.id)
    assert relacao.produto_id == produto.id
    assert relacao.casa_id == casa.id
    assert relacao.quantidade_desejada == 1
    assert relacao.quantidade_real == 1

def test_get_casas(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casas = CasaRepository.getCasasUsers(1)
    assert len(casas) == 1



