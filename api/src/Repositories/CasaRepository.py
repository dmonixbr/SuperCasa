from src import db

class Casa(db.Model):
    __tablename__ = 'casa'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(255), nullable=True)
    createdByUserId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

def getCasaById(id) -> Casa:
    return Casa.query.filter_by(id=id).first()

def getCasasUsers(userId: int) -> list[Casa]:
    return Casa.query.filter_by(createdByUserId=userId).all()

def createCasa(nome: str, descricao: str, id: int) -> Casa:
    casa = Casa(nome=nome, descricao=descricao, createdByUserId=id)
    db.session.add(casa)
    db.session.commit()
    return casa

def updateCasa(id: int, nome: str, descricao: str) -> Casa:
    casa = getCasaById(id)
    casa.nome = nome
    casa.descricao = descricao
    db.session.commit()
    return casa

def deleteCasa(id: int) -> Casa:
    casa = getCasaById(id)
    db.session.delete(casa)
    db.session.commit()
    return casa