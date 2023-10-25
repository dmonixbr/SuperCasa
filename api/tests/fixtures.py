import pytest
from src import create_app, db

@pytest.fixture
def client():
  app = create_app()
  app.testing = True
  with app.test_client() as testclient:
    with app.app_context():
      db.create_all()
      yield testclient