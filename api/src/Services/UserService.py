from src.Repositories.UserRepository import UserRepository, User
from src import bcrypt

repository = UserRepository()

def createUser(username: str, password: str, _repository: UserRepository = repository) -> User:
    user = _repository.getUserByUsername(username)

    if user:
        return None
    
    password_encrypted = bcrypt.generate_password_hash(password).decode('utf-8')
    return _repository.createUser(username, password_encrypted)

def login(username: str, password: str, _repository: UserRepository = repository) -> User:
    user = _repository.getUserByUsername(username)
    if user and _validatePassword(user, password):
        return user
    
    return None

def getUserById(id: int, _repository: UserRepository = repository) -> User:
    return _repository.getUserById(id)

def getUserByUsername(username: str, _repository: UserRepository = repository) -> User:
    return _repository.getUserByUsername(username)

def getUsers(_repository: UserRepository = repository) -> list:
    return _repository.getUsers()

def _validatePassword(user: User, password: str) -> bool:
    if user:
        return bcrypt.check_password_hash(user.password, password)

    return False

def updateUser(id: int, username: str, password: str, oldPasword:str, _repository: UserRepository = repository) -> User:
    user = _repository.getUserById(id)

    if user and username and not password and _validatePassword(user, oldPasword):
        user.username = username
        return _repository.updateUser(user)

    if user and password and not username and _validatePassword(user, oldPasword):
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')
        return _repository.updateUser(user)
    
    if user and username and password and _validatePassword(user, oldPasword):
        user.username = username
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')
        return _repository.updateUser(user)
    
    return None

def deleteUser(id: int, _repository: UserRepository = repository) -> User:
    user = _repository.getUserById(id)
    if user:
        return _repository.deleteUser(user)
    
    return None
        
            
