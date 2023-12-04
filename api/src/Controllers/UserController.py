from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import src.Services.UserService as UserService
import src.libs.HttpResponse as HttpResponse
from datetime import timedelta
from src.libs.RespostaHTTP import createResponse
from flask_jwt_extended import jwt_required, get_jwt_identity, unset_jwt_cookies

user = Blueprint('user', __name__, 'user')

# Endpoint para o metodo GET de users
@user.route('/login', methods=['POST'])
def login():
    try:
        username:str = request.json.get('username')
        password:str = request.json.get('password')

        # Realize a validação do usuário e senha (geralmente contra um banco de dados)
        # Se as credenciais forem válidas, crie um token JWT
        user = UserService.login(username, password)
        if user:
            access_token = create_access_token(identity=username, expires_delta=timedelta(minutes=60))
            resposta = createResponse({"id":user.id, "username": user.username, "JWT": access_token}, HttpResponse.SUCCESS)
            return resposta
        else:
            resposta = createResponse({"error": "Credenciais inválidas"}, HttpResponse.UNAUTHORIZED)
            return resposta
    except ValueError as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.BAD_REQUEST)
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

@user.route('/', methods=['POST'])
def createUser():
    try:
        username:str = request.json.get('username')
        password:str = request.json.get('password')

        if not username or not password:
            return jsonify({"error": "Dados insuficientes"}), HttpResponse
        
        user = UserService.createUser(username, password)
        resposta = createResponse({"username": user.username, "id": user.id}, HttpResponse.CREATED)
        return resposta
    except ValueError as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.BAD_REQUEST)
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta

@user.route('/', methods=['PUT'])
@jwt_required()
def updateUser():
    try:
        currentUser = get_jwt_identity()
        if not currentUser:
            resposta = createResponse({"error": "Sem autorização para realizar alteração"}, HttpResponse.UNAUTHORIZED)
            return resposta
        
        usuarioLogado = UserService.getUserByUsername(currentUser)

        id: int = int(request.json.get('id'))
        username:str = request.json.get('username')
        password:str = request.json.get('password')
        oldPassword:str = request.json.get('oldPassword')

        if id != usuarioLogado.id:
            resposta = createResponse({"error": "Sem autorização para realizar alteração"}, HttpResponse.UNAUTHORIZED)
            return resposta

        if not username and not password and not oldPassword and not id:
            resposta = createResponse({"error": "Dados insuficientes"}, HttpResponse.BAD_REQUEST)
            return resposta
        
        user = UserService.updateUser(id, username, password, oldPassword)
        if user:
            resposta = createResponse({"username": user.username}, HttpResponse.SUCCESS)
            return resposta
        else:
            resposta = createResponse({"error": "Usuário não encontrado ou senha inválida!"}, HttpResponse.NOT_FOUND)
            return resposta
    except ValueError as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.BAD_REQUEST)
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta
    
@user.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        currentUser = get_jwt_identity()
        if not currentUser:
            resposta = createResponse({"error": "Sem autorização para realizar alteração"}, HttpResponse.UNAUTHORIZED)
            return resposta
        
        resposta = createResponse({"message": "Logout realizado com sucesso!"}, HttpResponse.SUCCESS)
        unset_jwt_cookies(resposta)
        return resposta
    except ValueError as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.BAD_REQUEST)
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta
    
@user.route('/validate', methods=['POST'])
@jwt_required()
def validate():
    try:
        currentUser = get_jwt_identity()
        if not currentUser:
            resposta = createResponse({"error": "Sem autorização para realizar alteração"}, HttpResponse.UNAUTHORIZED)
            return resposta
        
        user = UserService.getUserByUsername(currentUser)
        resposta = createResponse({"id":user.id, "username": user.username}, HttpResponse.SUCCESS)
        return resposta
    except ValueError as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.BAD_REQUEST)
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta
    
@user.route('/<int:id>', methods=['DELETE'])
def deleteUser(id):
    try:
        user = UserService.deleteUser(id)
        if user:
            resposta = createResponse({"sucesso": f"Usuário {user.username} deletado com sucesso!"}, HttpResponse.SUCCESS)
            return resposta
    except ValueError as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.BAD_REQUEST)
        return resposta
    except Exception as e:
        resposta = createResponse({"error": str(e)}, HttpResponse.INTERNAL_SERVER_ERROR)
        return resposta