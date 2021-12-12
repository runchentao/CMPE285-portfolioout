from functools import total_ordering
from flask import Flask, abort
from flask_restful import Resource, Api
from main import *

app = Flask(__name__)
api = Api(app)


class StockSuggestion(Resource):
    def get(self, strategy, investment):
        try:
            s = StockAPI()
            status = s.createPortfolio(strategy, investment)
            res = s.portfolio
            metaData = res[:-1]
            chartData = res[-1]

            # Get number of shares invested per stock
            investedShares = []
            for stock in metaData:
                investedShares.append(stock["shares"])

            # Create chart data for overall portfolio value changes
            portfolio_value_chart_data = [["Date", "Portfolio"]]
            for i in range(1, len(chartData)):
                new_entry = [chartData[i][0]]
                tot_gain = 0
                count = 0
                for j in range(1, len(chartData[i])):
                    tot_gain += chartData[i][j] * investedShares[count]
                    count += 1
                new_entry.append(tot_gain + s.investUSD)
                portfolio_value_chart_data.append(new_entry)

            # Create pie chart data
            pie_chart_data = [["Stocks", "Investments per Stock"]]
            count = 0
            for stock in metaData:
                new_entry = [stock["symbol"],
                             stock["currentPrice"] * investedShares[count]]
                count += 1
                pie_chart_data.append(new_entry)
            print(pie_chart_data)

            return {"data": metaData, "chartData": chartData, "portfolio": portfolio_value_chart_data, "pieData": pie_chart_data, "initialInvestUSD": s.investUSD}, 200 if status == 1 else abort(400)
        except:
            abort(500)


api.add_resource(StockSuggestion, '/suggest/<int:strategy>/<int:investment>')

if __name__ == '__main__':
    app.run(debug=True)
