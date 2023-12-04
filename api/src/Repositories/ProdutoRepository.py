from src import db

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(500))
    marca = db.Column(db.String(100), nullable=False)
    createdByUserId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, nome: str, descricao: str, marca: str, createdByUserId: int):
        self.nome = nome
        self.descricao = descricao
        self.marca = marca
        self.createdByUserId = createdByUserId

def getProdutoById(id: int) -> Produto:
    return Produto.query.filter_by(id=id).first()

def getProdutos() -> list[Produto]:
    return Produto.query.all()

def createProduto(nome: str, descricao: str, marca: str, createdByUserId: int) -> Produto:
    produto = Produto(nome, descricao, marca, createdByUserId)
    db.session.add(produto)
    db.session.commit()
    return produto

def updateProduto(id: int, nome: str, descricao: str, marca: str) -> Produto:
    produto = getProdutoById(id)
    produto.nome = nome
    produto.descricao = descricao
    produto.marca = marca
    db.session.commit()
    return produto

def deleteProduto(id: int) -> Produto:
    produto = getProdutoById(id)
    db.session.delete(produto)
    db.session.commit()
    return produto


