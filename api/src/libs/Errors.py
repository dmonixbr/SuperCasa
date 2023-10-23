class ResponseException(Exception):
    def __init__(self, mensagem: str, tipo: int, area: str, modulo: str):
        super().__init__(mensagem)

        self.tipo = tipo
        self.area = area
        self.modulo = modulo

    def Response(self):
        return {
            "error": self.mensagem,
            "modulo": self.modulo,
            "area": self.area
        }, self.tipo