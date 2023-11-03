import src.Services.CasaService as CasaService
import src.Repositories.ProdutoRepository as ProdutoRepository
import src.Services.UserService as UserService
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

def test_create_casa(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"
    assert casa.createdByUserId == 1

def test_update_casa(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    casa = CasaService.updateCasa(casa.id, "Casa 2", "Casa 2", user.username)
    assert casa.nome == "Casa 2"
    assert casa.descricao == "Casa 2"

def test_delete_casa(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    casa = CasaService.deleteCasa(casa.id, user.username)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"

def test_get_casa_by_id(client, user):
    casa = CasaService.createCasa("Casa 1", "Casa 1", user.username)
    casa = CasaService.getCasaById(casa.id, user.username)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"
