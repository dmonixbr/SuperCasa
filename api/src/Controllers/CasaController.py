from flask import Blueprint

casa = Blueprint('casa', __name__, 'casa')

# Endpoint para o metodo GET de casas
@casa.route('/', methods=['GET'])
def get_casas():
    return "Lista de casas"