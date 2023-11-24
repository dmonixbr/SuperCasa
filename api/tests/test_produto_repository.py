import src.Repositories.ProdutoRepository as ProdutoRepository
import pytest
from src import create_app, db_test as db

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


def test_create_produto(client):
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    assert produto.nome == "Produto 1"
    assert produto.descricao == "Produto 1"
    assert produto.marca == "MARCA"
    assert produto.createdByUserId == 1

def test_update_produto(client):
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    produto = ProdutoRepository.updateProduto(produto.id, "Produto 2", "Produto 2", "MARCA")
    assert produto.nome == "Produto 2"
    assert produto.descricao == "Produto 2"
    assert produto.marca == "MARCA"

def test_delete_produto(client):
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    produto = ProdutoRepository.deleteProduto(produto.id)
    assert produto.nome == "Produto 1"
    assert produto.descricao == "Produto 1"
    assert produto.marca == "MARCA"

def test_get_produto_by_id(client):
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    produto = ProdutoRepository.getProdutoById(produto.id)
    assert produto.nome == "Produto 1"
    assert produto.descricao == "Produto 1"
    assert produto.marca == "MARCA"

def test_get_produtos(client):
    produto = ProdutoRepository.createProduto("Produto 1", "Produto 1", "MARCA", 1)
    produtos = ProdutoRepository.getProdutos()
    assert produtos[-1].nome == "Produto 1"
    assert produtos[-1].descricao == "Produto 1"
    assert produtos[-1].marca == "MARCA"


   