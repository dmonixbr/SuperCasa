from src import db
import src.Repositories.ProdutoRepository as ProdutoRepository

casa_produtos = db.Table(
    'casa_produtos',
    db.Column('produto_id', db.Integer, db.ForeignKey('produto.id')),
    db.Column('casa_id', db.Integer, db.ForeignKey('casa.id')),
    db.Column('quantidade_desejada', db.Integer),  # Adicione este campo
    db.Column('quantidade_real', db.Integer)  # Adicione este campo
)

class Casa(db.Model):
    __tablename__ = 'casa'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(255), nullable=True)
    createdByUserId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    produtos = db.relationship('Produto', secondary=casa_produtos, backref=db.backref('casas', lazy='dynamic'))


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

def adicionaProdutoCasa(idCasa: int, idProduto: int, quantidadeDesejada: int, quantidadeReal: int) -> Casa:
    casa = getCasaById(idCasa)
    produto = ProdutoRepository.getProdutoById(idProduto)
    if produto in casa.produtos:
        raise ValueError('Produto já adicionado na casa')
    
    casa.produtos.append(produto)
    casa.produtos[-1].quantidade_desejada = quantidadeDesejada
    casa.produtos[-1].quantidade_real = quantidadeReal
    db.session.commit()

    return casa

def somaQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMais: int) -> Casa:
    casa = getCasaById(idCasa)
    produto = ProdutoRepository.getProdutoById(idProduto)
    
    if produto not in casa.produtos:
        raise ValueError('Produto não adicionado na casa')
    
    indexProduto = casa.produtos.index(produto)
    casa.produtos[indexProduto].quantidade_real += quantidadeAMais

    db.session.commit()

    return casa

def subtraiQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMenos: int) -> Casa:
    casa = getCasaById(idCasa)
    produto = ProdutoRepository.getProdutoById(idProduto)
    
    if produto not in casa.produtos:
        raise ValueError('Produto não adicionado na casa')
    
    indexProduto = casa.produtos.index(produto)
    casa.produtos[indexProduto].quantidade_real -= quantidadeAMenos

    db.session.commit()

    return casa

def removeProdutoCasa(idCasa: int, idProduto: int) -> Casa:
    casa = getCasaById(idCasa)
    produto = ProdutoRepository.getProdutoById(idProduto)
    
    if produto not in casa.produtos:
        raise ValueError('Produto não adicionado na casa')
    
    casa.produtos.remove(produto)
    db.session.commit()

    return casa