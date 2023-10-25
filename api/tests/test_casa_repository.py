from fixtures import client
import src.repositories.CasaRepository as CasaRepository

def test_create_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"
    assert casa.createdByUserId == 1

def test_update_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.updateCasa(casa.id, "Casa 2", "Casa 2")
    assert casa.nome == "Casa 2"
    assert casa.descricao == "Casa 2"

def test_delete_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.deleteCasa(casa.id)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"

def test_get_casa_by_id(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.getCasaById(casa.id)
    assert casa.nome == "Casa 1"
    assert casa.descricao == "Casa 1"

def test_adiciona_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, 1, 1, 1, None)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == 1
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 1

def test_soma_quantidade_produto(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, 1, 1, 1, None)
    casa = CasaRepository.somaQuantidadeProduto(casa.id, 1, 1)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == 1
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 2

def test_subtrai_quantidade_produto(client):   
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, 1, 1, 1, None)
    casa = CasaRepository.subtraiQuantidadeProduto(casa.produtos_associados[0], casa, 1)
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == 1
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 1
    assert casa.produtos_associados[0].quantidade_real == 0

def test_remove_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, 1, 1, 1, None)
    casa = CasaRepository.removeProdutoCasa(casa.id, 1)
    assert len(casa.produtos_associados) == 0

def test_update_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, 1, 1, 1, None)
    casa = CasaRepository.adicionaProdutoCasa(casa, 1, 2, 2, casa.produtos_associados[0])
    assert len(casa.produtos_associados) == 1
    assert casa.produtos_associados[0].produto_id == 1
    assert casa.produtos_associados[0].casa_id == casa.id
    assert casa.produtos_associados[0].quantidade_desejada == 2
    assert casa.produtos_associados[0].quantidade_real == 2

def test_get_relacao_produto_casa(client):
    casa = CasaRepository.createCasa("Casa 1", "Casa 1", 1)
    casa = CasaRepository.adicionaProdutoCasa(casa, 1, 1, 1, None)
    relacao = CasaRepository.getRelacaoProdutoCasa(casa.id, 1)
    assert relacao.produto_id == 1
    assert relacao.casa_id == casa.id
    assert relacao.quantidade_desejada == 1
    assert relacao.quantidade_real == 1