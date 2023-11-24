import src.Repositories.UserRepository as UserRepository
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

def test_create_user(client):
    user = UserRepository.createUser("User Teste", "123456")
    assert user.username == "User Teste"
    assert user.password == "123456"

def test_update_user(client):
    user = UserRepository.createUser("User Teste", "123456")
    user.password = "654321"
    user = UserRepository.updateUser(user)
    assert user.username == "User Teste"
    assert user.password != "123456"

def test_delete_user(client):
    user = UserRepository.createUser("User Teste", "123456")
    id = user.id
    user = UserRepository.deleteUser(user)
    deleted_user = UserRepository.getUserById(id)
    assert deleted_user == None

def test_get_user_by_id(client):
    user = UserRepository.createUser("User Teste", "123456")
    user = UserRepository.getUserById(user.id)
    assert user.username == "User Teste"

def test_get_user_by_username(client):
    user = UserRepository.createUser("User Teste", "123456")
    user = UserRepository.getUserByUsername(user.username)
    assert user.username == "User Teste"




