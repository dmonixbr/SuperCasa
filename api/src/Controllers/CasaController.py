from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import src.libs.HttpResponse as HttpResponse
from src.libs.Errors import ResponseException
import src.Services.CasaService as CasaService
from src.libs.RespostaHTTP import createResponse

casa = Blueprint('casa', __name__, 'casa')

# Endpoint para o metodo GET de casas
@casa.route('/', methods=['GET'])
@jwt_required()
def get_casas():
    try:
        currentUser = get_jwt_identity()
        
        casas = CasaService.getCasas(currentUser)
        resposta = createResponse([{"id": casa.id, "nome": casa.nome, "descricao": casa.descricao} for casa in casas], HttpResponse.SUCCESS)
        return resposta
    
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo GET de casa especifica
@casa.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_casa(id):
    try:
        currentUser = get_jwt_identity()

        casa = CasaService.getCasaById(id, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo Post de casa
@casa.route('/', methods=['POST'])
@jwt_required()
def createCasa():
    try:
        currentUser = get_jwt_identity()
        
        data = request.get_json()
        nome = data['nome']
        descricao = data['descricao']
        
        casa = CasaService.createCasa(nome, descricao, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao}, HttpResponse.CREATED)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo PUT de casa
@casa.route('/<int:id>', methods=['PUT'])
@jwt_required()
def updateCasa(id):
    try:
        currentUser = get_jwt_identity()

        nome: str = request.json.get('nome')
        descricao: str = request.json.get('descricao')
        
        casa = CasaService.updateCasa(id, nome, descricao, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo DELETE de casa
@casa.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteCasa(id):
    try:
        currentUser = get_jwt_identity()

        casa = CasaService.deleteCasa(id, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo adicionarProduto a casa
@casa.route('/<int:id>/adicionarProduto', methods=['PUT'])
@jwt_required()
def adcionarProdutoCasa(id):
    try:
        currentUser = get_jwt_identity()

        produtoId: int = request.json.get('produtoId')
        quantidadeDesejada = int(request.json.get('quantidadeDesejada'))
        quantidadeReal = int(request.json.get('quantidadeReal'))
        
        casa = CasaService.adicionarProdutoCasa(id, produtoId, quantidadeDesejada, quantidadeReal, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao, "produtos": casa.getProdutos()}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo removeProduto a casa
@casa.route('/<int:id>/removerProduto', methods=['PUT'])
@jwt_required()
def removeProdutoCasa(id):
    try:
        currentUser = get_jwt_identity()

        produtoId = request.json.get('produtoId')

        casa = CasaService.removeProdutoCasa(id, produtoId, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao, "produtos": casa.getProdutos()}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo somaQuantidadeProduto a casa
@casa.route('/<int:id>/somaQuantidadeProduto', methods=['PUT'])
@jwt_required()
def somaQuantidadeProduto(id):
    try:
        currentUser = get_jwt_identity()

        produtoId = request.json.get('produtoId')
        quantidadeAMais = int(request.json.get('quantidadeAMais'))

        casa = CasaService.somaQuantidadeProduto(id, produtoId, quantidadeAMais, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao, "produtos": casa.getProdutos()}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

# Endpoint para o metodo subtraiQuantidadeProduto a casa
@casa.route('/<int:id>/subtraiQuantidadeProduto', methods=['PUT'])
@jwt_required()
def subtraiQuantidadeProduto(id):
    try:
        currentUser = get_jwt_identity()

        produtoId = request.json.get('produtoId')
        quantidadeAMenos = request.json.get('quantidadeAMenos')

        casa = CasaService.subtraiQuantidadeProduto(id, produtoId, quantidadeAMenos, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao, "produtos": casa.getProdutos()}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta
    

# Endpoint para o metodo updateProdutoCasa a casa
@casa.route('/<int:id>/updateProdutoCasa', methods=['PUT'])
@jwt_required()
def updateProdutoCasa(id):
    try:
        currentUser = get_jwt_identity()

        produtoId = request.json.get('produtoId')
        relacao = CasaService.getRelacaoProdutoCasa(id, produtoId, currentUser)
        quantidadeDesejada = request.json.get('quantidadeDesejada', relacao.quantidade_desejada)
        quantidadeReal = request.json.get('quantidadeReal', relacao.quantidade_real)

        casa = CasaService.updateProdutoCasa(relacao, quantidadeDesejada, quantidadeReal, currentUser)
        resposta = createResponse({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao, "produtos": casa.getProdutos()}, HttpResponse.SUCCESS)
        return resposta
    except ResponseException as e:
        resposta = createResponse({"error": f"{e.getModulo}.{e.getArea}: {e.getMensagem}"}, e.getTipo())
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta