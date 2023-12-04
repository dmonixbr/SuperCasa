from src import db

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)

def getUserById(id: int) -> User:
    return User.query.filter_by(id=id).first()

def getUserByUsername(username: str) -> User:
    return User.query.filter_by(username=username).first()

def createUser(username: str, password: str) -> User:
    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return user

def updateUser(user: User) -> User:
    db.session.add(user)
    db.session.commit()
    return user

def deleteUser(user: User) -> User:
    db.session.delete(user)
    db.session.commit()
    return user