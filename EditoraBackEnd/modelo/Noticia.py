from .db import db
import mongoengine_goodjson as gj

class Noticia(gj.Document):
    titulo = db.StringField(required=True, unique=True)
    conteudo = db.StringField(required=True)
    datapublicacao = db.StringField(required=True)
