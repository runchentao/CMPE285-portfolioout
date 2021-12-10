from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from main import *

app = Flask(__name__)
api = Api(app)


class StockSuggestion(Resource):
    def get(self):
        s = StockAPI()
        status = s.createPortfolio(5, 5000)
        return {'data': s.portfolio}, 200 if status == 1 else 500

    def post(self):
        return {'data': 'POST route hit'}, 200


api.add_resource(StockSuggestion, '/')

if __name__ == '__main__':
    app.run(debug=True)
