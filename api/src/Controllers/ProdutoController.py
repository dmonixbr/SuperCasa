from flask import Blueprint

produto = Blueprint('produto', __name__, 'produto')

# Endpoint para o metodo GET de produtos
@produto.route('/', methods=['GET'])
def get_produtos():
    return "Lista de produtos"