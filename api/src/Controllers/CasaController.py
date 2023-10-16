from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import src.Services.CasaService as CasaService

casa = Blueprint('casa', __name__, 'casa')

# Endpoint para o metodo GET de casas
@casa.route('/', methods=['GET'])
@jwt_required()
def get_casas():
    currentUser = get_jwt_identity()
    
    casas = CasaService.getCasas()
    return jsonify([{"id": casa.id, "nome": casa.nome, "descricao": casa.descricao} for casa in casas], currentUser), 200

# Endpoint para o metodo Post de casa
@casa.route('/', methods=['POST'])
@jwt_required()
def createCasa():
    currentUser = get_jwt_identity()
    
    data = request.get_json()
    nome = data['nome']
    descricao = data['descricao']
    
    casa = CasaService.createCasa(nome, descricao, currentUser)
    return jsonify({"id": casa.id, "nome": casa.nome, "descricao": casa.descricao, "currentUser": currentUser}), 201