from flask import Flask, jsonify, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class StockSuggestion(Resource):
    def get(self):
        return {'data': 'GET route hit'}, 200

    def post(self):
        return {'data': 'POST route hit'}, 200


api.add_resource(StockSuggestion, '/')

if __name__ == '__main__':
    app.run(debug=True)
