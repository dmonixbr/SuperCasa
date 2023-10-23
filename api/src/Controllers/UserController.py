from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import src.Services.UserService as UserService
import src.libs.HttpResponse as HttpResponse
from datetime import timedelta

user = Blueprint('user', __name__, 'user')

# Endpoint para o metodo GET de users
@user.route('/login', methods=['POST'])
def login():
    try:
        username:str = request.json.get('username')
        password:str = request.json.get('password')

        # Realize a validação do usuário e senha (geralmente contra um banco de dados)
        # Se as credenciais forem válidas, crie um token JWT
        if UserService.login(username, password):
            access_token = create_access_token(identity=username, expires_delta=timedelta(minutes=60))
            return jsonify(access_token=access_token), HttpResponse.SUCCESS
        else:
            return jsonify({"message": "Credenciais inválidas"}), HttpResponse.UNAUTHORIZED
    except ValueError as e:
        return jsonify({"error": str(e)}), HttpResponse.BAD_REQUEST
    except Exception as e:
        return jsonify({"error": str(e)}), HttpResponse.INTERNAL_SERVER_ERROR

@user.route('/', methods=['POST'])
def createUser():
    try:
        username:str = request.json.get('username')
        password:str = request.json.get('password')

        if not username or not password:
            return jsonify({"message": "Dados insuficientes"}), HttpResponse
        
        user = UserService.createUser(username, password)
        return jsonify({"username":user.username}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), HttpResponse
    except Exception as e:
        return jsonify({"error": str(e)}), HttpResponse.INTERNAL_SERVER_ERROR

@user.route('/', methods=['PUT'])
def updateUser():
    try:
        id: int = int(request.json.get('id'))
        username:str = request.json.get('username')
        password:str = request.json.get('password')
        oldPassword:str = request.json.get('oldPassword')

        if not username and not password and not oldPassword and not id:
            return jsonify({"message": "Dados insuficientes"}), HttpResponse
        
        user = UserService.updateUser(id, username, password, oldPassword)
        if user:
            return jsonify({"username":user.username}), HttpResponse.SUCCESS
        else:
            return jsonify({"message": "Usuário não encontrado ou senha inválida!"}), HttpResponse.NOT_FOUND
    except ValueError as e:
        return jsonify({"error": str(e)}), HttpResponse
    except Exception as e:
        return jsonify({"error": str(e)}), HttpResponse.INTERNAL_SERVER_ERROR