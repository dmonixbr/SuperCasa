import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
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

convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(app, metadata=metadata)
Migrate(app,db, render_as_batch=True)


#############################################################
####################### BLUEPRINTS ##########################
#############################################################

from src.Controllers.UserController import user
from src.Controllers.CasaController import casa
from src.Controllers.ProdutoController import produto


app.register_blueprint(user, url_prefix="/user")
app.register_blueprint(casa, url_prefix="/casa")
app.register_blueprint(produto, url_prefix="/produto")