import pytest
from __init__ import create_app
from fixtures import client

def test_list_matches(client):
    resp = client.get('/casa')
    assert resp.status_code == 200

def test_login_user(client):
    resp = client.post('/casa/23', data={
        'email': 'admin@admin.com', 'password': 'eusouadm'
    })
    assert resp.status_code == 200

def test_user_data(client):
    resp = client.get('/user_data')
    assert resp.status_code == 200

def test_logout(client):
    resp = client.get('/logout')
    assert resp.status_code == 302