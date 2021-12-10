from flask import Flask, jsonify, request, abort
from flask_restful import Resource, Api
from main import *

app = Flask(__name__)
api = Api(app)


class StockSuggestion(Resource):
    def get(self, strategy, investment):
        try:
            s = StockAPI()
            status = s.createPortfolio(strategy, investment)
            return {'data': s.portfolio}, 200 if status == 1 else abort(400)
        except:
            abort(500)


api.add_resource(StockSuggestion, '/suggest/<int:strategy>/<int:investment>')

if __name__ == '__main__':
    app.run(debug=True)
