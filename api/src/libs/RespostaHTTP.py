from flask import Response
import json


def createResponse(data: dict, status: int):
    dados = json.dumps(data)
    response = Response(dados, status=status, mimetype='application/json')
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'

    return response