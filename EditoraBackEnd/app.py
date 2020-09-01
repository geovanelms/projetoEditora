#!flask/bin/python
from flask import Flask, request, Response
from flask_cors import CORS
from modelo.db import initialize_db
from modelo.Noticia import Noticia

app = Flask(__name__)
CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost:27017/editora'
}
initialize_db(app)


@app.route('/')
def raiz():
    return {'data': 'valor vazio'}


@app.route('/editora/noticias', methods=['GET'])
def busca_noticias():
    noticias = Noticia.objects().to_json()
    return Response(noticias, mimetype="application/json", status=200)


@app.route('/editora/noticias/<id>')
def busca_noticia_id(id):
    noticia = Noticia.objects.get(id=id).to_json()
    return Response(noticia, mimetype="application/json", status=200)


@app.route('/editora/noticias', methods=['POST'])
def grava_noticia():
    body = request.get_json()
    noticia = Noticia(**body).save()
    id = noticia.id
    return {'id': str(id)}, 200


@app.route('/editora/noticias/<id>', methods=['PUT'])
def atualiza_noticia(id):
    body = request.get_json()
    Noticia.objects.get(id=id).update(**body)
    return '', 200


@app.route('/editora/noticias/<id>', methods=['DELETE'])
def remove_noticia(id):
    Noticia.objects.get(id=id).delete()
    return '', 200

app.run()
