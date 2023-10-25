import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

convention = {
        "ix": 'ix_%(column_0_label)s',
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s"
    }

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app():
    app = Flask(_name_)
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Substitua isso por uma chave secreta segura

    ############################################################
    ################## BANCO DE DADOS ##########################
    ############################################################


    basedir = os.path.abspath(os.path.dirname(_file_))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    Migrate(app,db, render_as_batch=True)

    jwt.init_app(app)
    bcrypt.init_app(app)


    #############################################################
    ####################### BLUEPRINTS ##########################
    #############################################################

    from src.Controllers.UserController import user
    from src.Controllers.CasaController import casa
    from src.Controllers.ProdutoController import produto


    app.register_blueprint(user, url_prefix="/user")
    app.register_blueprint(casa, url_prefix="/casa")
    app.register_blueprint(produto, url_prefix="/produto")

    return app
