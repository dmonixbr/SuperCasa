import src.Repositories.UserRepository as UserRepository
from src import bcrypt

def createUser(username: str, password: str):
    user = UserRepository.getUserByUsername(username)

    if user:
        raise ValueError('Usuário já existe')
    
    password_encrypted = bcrypt.generate_password_hash(password).decode('utf-8')
    return UserRepository.createUser(username, password_encrypted)

def login(username: str, password: str):
    user = UserRepository.getUserByUsername(username)
    if user and _validatePassword(user, password):
        return user
    
    raise ValueError('Usuário ou senha inválidos')

def getUserById(id) -> UserRepository.User:
    return UserRepository.getUserById(id)

def getUserByUsername(username) -> UserRepository.User:
    return UserRepository.getUserByUsername(username)

def _validatePassword(user: UserRepository.User, password: str) -> bool:
    if user:
        return bcrypt.check_password_hash(user.password, password)

    raise ValueError('Usuário não encontrado')

def updateUser(id: int, username: str, password: str, oldPasword:str) -> UserRepository.User:
    user = UserRepository.getUserById(id)

    if user and username and not password and _validatePassword(user, oldPasword):
        user.username = username
        return UserRepository.updateUser(user)

    if user and password and not username and _validatePassword(user, oldPasword):
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')
        return UserRepository.updateUser(user)
    
    if user and username and password and _validatePassword(user, oldPasword):
        user.username = username
        user.password = bcrypt.generate_password_hash(password).decode('utf-8')
        return UserRepository.updateUser(user)
    
    raise ValueError('Usuário não encontrado ou senha inválida!')

def deleteUser(id: int) -> UserRepository.User:
    user = UserRepository.getUserById(id)
    if user:
        return UserRepository.deleteUser(user)
    
    raise ValueError('Usuário não encontrado')
        