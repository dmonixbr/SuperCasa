from flask import jsonify
class ResponseException(Exception):
    def __init__(self, mensagem: str, tipo: int, area: str, modulo: str):
        super().__init__(mensagem)
        self.mensagem = mensagem
        self.tipo = tipo
        self.area = area
        self.modulo = modulo

    def getTipo(self):
        return self.tipo
    
    def getArea(self):
        return self.area
    
    def getModulo(self):
        return self.modulo
    
    def getMensagem(self):
        return self.mensagem

    def Response(self):
        return jsonify({
            "error": self.mensagem,
            "modulo": self.modulo,
            "area": self.area
        }), self.tipo
