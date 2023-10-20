from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import src.Services.ProdutoService as ProdutoService

produto = Blueprint('produto', __name__, 'produto')

# Endpoint para o metodo GET de produtos
@produto.route('/', methods=['GET'])
@jwt_required()
def getProdutos():
    try:
        currentUser = get_jwt_identity()

        produtos = ProdutoService.getProdutos(currentUser)

        return jsonify([{"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca, "criadoPor": produto.createdByUserId} for produto in produtos]), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para o metodo GET de produto especifico
@produto.route('/<int:id>', methods=['GET'])
@jwt_required()
def getProduto(id):
    try:
        currentUser = get_jwt_identity()

        produto = ProdutoService.getProdutoById(id, currentUser)
        return jsonify({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca, "criadoPor": produto.createdByUserId}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
        return jsonify({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca, "criadoPor": produto.createdByUserId}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
        return jsonify({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca, "criadoPor": produto.createdByUserId}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Endpoint para metodo DELETE de produto
@produto.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteProduto(id):
    try:
        currentUser = get_jwt_identity()

        produto = ProdutoService.deleteProduto(id, currentUser)
        return jsonify({"id": produto.id, "nome": produto.nome, "descricao": produto.descricao, "marca": produto.marca, "criadoPor": produto.createdByUserId}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500