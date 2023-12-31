import src.Services.UserService as UserService
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

def test_create_user(client):
    user = UserService.createUser(username="User Teste", password="123456")
    assert user.username == "User Teste"

def test_delete_user(client):
    user = UserService.createUser("User Teste", "123456")
    id = user.id
    user = UserService.deleteUser(user.id)
    deleted_user = UserService.getUserById(id)
    assert deleted_user == None

def test_get_user_by_id(client):
    user = UserService.createUser("User Teste", "123456")
    user = UserService.getUserById(user.id)
    assert user.username == f"User Teste"

def get_user_by_username(client):
    user = UserService.createUser("User Teste", "123456")
    user = UserService.getUserByUsername(user.username)
    assert user.username == "User Teste"

def test_login(client):
    user = UserService.createUser("User Teste", "123456")
    login = UserService.login("User Teste", "123456")
    assert login != None

def test_update_user(client):
    user = UserService.createUser("User Teste", "123456")
    user = UserService.updateUser(user.id, "User Teste 2", "123456", "123456")
    assert user.username == "User Teste 2"

def test_error_login(client):
    user = UserService.createUser("User Teste", "123456")
    with pytest.raises(ValueError) as exc_info:
        login = UserService.login("User Teste", "5678")

def test_error_update(client):
    user = UserService.createUser("User Teste", "123456")
    with pytest.raises(ValueError) as exc_info:
        user = UserService.updateUser(user.id, "User Teste 2", "123456", "5678")

def test_delete_user_not_existent(client):
    with pytest.raises(ValueError) as exc_info:
        user = UserService.deleteUser(1)

def test_user_exists(client):
    user = UserService.createUser("User Teste", "123456")
    with pytest.raises(ValueError) as exc_info:
        user2 = UserService.createUser("User Teste", "123456")

def test_user_not_exists(client):
    with pytest.raises(ValueError) as exc_info:
        login = UserService.login("User Teste", "12345")

def test_update_username(client):
    user = UserService.createUser("User Teste", "123456")
    user = UserService.updateUser(user.id, "User Teste 2", None, "123456")
    assert user.username == "User Teste 2"

def test_update_password(client):
    user = UserService.createUser("User Teste", "123456")
    user = UserService.updateUser(user.id, None, "234", "123456")
    assert user.password != "123456"

def test_validate_password(client):
    with pytest.raises(ValueError) as exc_info:
        UserService._validatePassword(None, '123456')