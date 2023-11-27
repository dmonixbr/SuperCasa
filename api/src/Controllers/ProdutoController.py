from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import src.Services.ProdutoService as ProdutoService
from src.libs.Errors import ResponseException
import src.libs.HttpResponse as HttpResponse
from src.libs.RespostaHTTP import createResponse

produto = Blueprint('produto', __name__, 'produto')

# Endpoint para o metodo GET de produtos
@produto.route('/', methods=['GET'])
@jwt_required()
def getProdutos():
    try:
        currentUser = get_jwt_identity()

        produtos = ProdutoService.getProdutos(currentUser)

        resposta = createResponse([{"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca} for produto in produtos], 200)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo GET de produto especifico
@produto.route('/<int:id>', methods=['GET'])
@jwt_required()
def getProduto(id):
    try:
        currentUser = get_jwt_identity()

        produto = ProdutoService.getProdutoById(id, currentUser)
        resposta = createResponse({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca}, 200)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoit para o metodo POST de produto
@produto.route('/', methods=['POST'])
@jwt_required()
def createPrduto():
    try:
        currentUser = get_jwt_identity()

        nome = request.json.get('nome')
        marca = request.json.get('marca')
        descricao = request.json.get('descricao')

        produto = ProdutoService.createProduto(nome, descricao, marca, currentUser)
        resposta = createResponse({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca}, 201)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo PUT de produto
@produto.route('/<int:id>', methods=['PUT'])
@jwt_required()
def updateProduto(id):
    try:
        currentUser = get_jwt_identity()

        produtoRequested = ProdutoService.getProdutoById(id, currentUser)

        nome = request.json.get('nome', produtoRequested.nome)
        marca = request.json.get('marca', produtoRequested.marca)
        descricao = request.json.get('descricao', produtoRequested.descricao)

        produto = ProdutoService.updateProduto(id, nome, descricao, marca, currentUser)
        resposta = createResponse({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca}, 200)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta
    
# Endpoint para metodo DELETE de produto
@produto.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteProduto(id):
    try:
        currentUser = get_jwt_identity()

        produto = ProdutoService.deleteProduto(id, currentUser)
        resposta = createResponse({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca}, 200)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta