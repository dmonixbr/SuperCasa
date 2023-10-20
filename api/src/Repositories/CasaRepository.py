from src import db
import src.Repositories.ProdutoRepository as ProdutoRepository

class CasaProduto(db.Model):
    __tablename__ = 'casa_produtos'

    produto_id = db.Column(db.Integer, db.ForeignKey('produto.id'), primary_key=True)
    casa_id = db.Column(db.Integer, db.ForeignKey('casa.id'), primary_key=True)
    quantidade_desejada = db.Column(db.Integer, nullable=False)
    quantidade_real = db.Column(db.Integer, nullable=False)
    ativo = db.Column(db.Boolean, nullable=False, default=True)

    casa = db.relationship("Casa", back_populates="produtos_associados")
    produto = db.relationship("Produto", backref="casas_associadas")

class Casa(db.Model):
    __tablename__ = 'casa'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(255), nullable=True)
    createdByUserId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    produtos_associados = db.relationship('CasaProduto', back_populates='casa')

    def getProdutos(self):
        return [
            {
                "id": produtoCasa.produto.id,
                "nome": produtoCasa.produto.nome,
                "marca": produtoCasa.produto.marca,
                "descricao": produtoCasa.produto.descricao,
                "quantidade_desejada": produtoCasa.quantidade_desejada,
                "quantidade_real": produtoCasa.quantidade_real
            }
            for produtoCasa in self.produtos_associados if produtoCasa.ativo
        ]


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

def adicionaProdutoCasa(casa: Casa, idProduto: int, quantidadeDesejada: int, quantidadeReal: int, relacao: CasaProduto) -> Casa:
    if relacao and relacao in casa.produtos_associados and not relacao.ativo:
        relacao.ativo = True
        relacao.quantidade_desejada = quantidadeDesejada
        relacao.quantidade_real = quantidadeReal
        db.session.commit()
        return casa
    
    casa.produtos_associados.append(CasaProduto(produto_id=idProduto, casa_id=casa.id, quantidade_desejada=quantidadeDesejada, quantidade_real=quantidadeReal))
    db.session.commit()

    return casa

def somaQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMais: int) -> Casa:
    casa = getCasaById(idCasa)
    produto = ProdutoRepository.getProdutoById(idProduto)
    
    indexProduto = casa.produtos_associados.index(produto)
    casa.produtos_associados[indexProduto].quantidade_real += quantidadeAMais

    db.session.commit()

    return casa

def subtraiQuantidadeProduto(idCasa: int, idProduto: int, quantidadeAMenos: int) -> Casa:
    casa = getCasaById(idCasa)
    produto = ProdutoRepository.getProdutoById(idProduto)
    
    if produto not in casa.produtos_associados:
        raise ValueError('Produto não adicionado na casa')
    
    indexProduto = casa.produtos_associados.index(produto)
    casa.produtos_associados[indexProduto].quantidade_real -= quantidadeAMenos

    db.session.commit()

    return casa

def removeProdutoCasa(casa: Casa, produto: ProdutoRepository.Produto) -> Casa:
    relacao = CasaProduto.query.filter_by(casa_id=casa.id, produto_id=produto.id).first()
    relacao.ativo = False
    db.session.commit()

    return casa

def getRelacaoProdutoCasa(idCasa: int, idProduto: int) -> CasaProduto:
    return CasaProduto.query.filter_by(casa_id=idCasa, produto_id=idProduto).first()