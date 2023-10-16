import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = "qualquercoisameo"
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Substitua isso por uma chave secreta segura
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

############################################################
################## BANCO DE DADOS ##########################
############################################################


basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
Migrate(app,db)


#############################################################
####################### BLUEPRINTS ##########################
#############################################################

from src.Controllers.UserController import user
from src.Controllers.CasaController import casa
from src.Controllers.ProdutoController import produto


app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(casa, url_prefix="/casa")
app.register_blueprint(produto, url_prefix="/produto")