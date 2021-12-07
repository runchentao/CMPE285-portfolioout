from typing import List, Type
import yfinance as yf
from datetime import date
import json

# Investment Strategy Constants
QUALITY = 3
VALUE = 4

"""
The StockAPI class utilizes the Yahoo Finance API to get stock information and analyzes
which stocks are the best to purchase for each of the 5 different investment strategies.
"""


class StockAPI:
    def __init__(self):
        # self.investUSD = investUSD
        self.ethicalStocks = [None] * 5
        self.growthStocks = [None] * 5
        self.indexStocks = [None] * 5
        self.qualityStocks = ["FTNT", "AMAT", "COF", "GNRC", "DVN"]
        self.valueStocks = ["BAC", "KHC", "VZ", "DVA", "BK"]
        self.portfolio = [
            {
                "symbol": "",
                "52WeekChange": 0,
                "currentPrice": 0,
                "investedUSD": 0,
                "amtGainedLoss": 0
            },
            {
                "symbol": "",
                "52WeekChange": 0,
                "currentPrice": 0,
                "investedUSD": 0,
                "amtGainedLoss": 0
            },
            {
                "symbol": "",
                "52WeekChange": 0,
                "currentPrice": 0,
                "investedUSD": 0,
                "amtGainedLoss": 0
            }
        ]

    def getEthicalStocks(self):
        print("TBD")

    def getGrowthStocks(self):
        print("TBD")

    def getIndexStocks(self):
        print("TBD")

    def getQualityStocks(self):
        print("top quality stocks: ", self.topThreeStocks(QUALITY))

    def getValueStocks(self):
        print("top value stocks: ", self.topThreeStocks(VALUE))

    # checkStrategy is a helper function that finds the strategy type based on the integer value
    def checkStrategy(self, strategy: int):
        strategyType = None
        if strategy == 0:
            strategyType = self.ethicalStocks
        elif strategy == 1:
            strategyType = self.growthStocks
        elif strategy == 2:
            strategyType = self.indexStocks
        elif strategy == 3:
            strategyType = self.qualityStocks
        elif strategy == 4:
            strategyType = self.valueStocks
        else:
            print("Invalid input strategy!")
            return -1
        return strategyType

    # topThreeStocks is a helper function that finds the top 3 stocks based on 52WeekChange value
    def topThreeStocks(self, strategy: int):
        strategyType = self.checkStrategy(strategy)
        if strategyType == None:
            print("Please specify a strategy type.")
            return -1

        try:
            stockValues = {}
            stockList = []

            for s in strategyType:
                code = yf.Ticker(s)
                stockValues[code.info["52WeekChange"]] = s
                stockList.append(code.info["52WeekChange"])
            stockList = sorted(stockList)[-3:]

            # Return stock symbol of top 3 stocks
            res = []
            for s in stockList:
                res.append(stockValues[s])

            return res

        except KeyError:
            print("Connection error, please check your internet.")

        except Exception:
            print("Invalid stock code, please try again.")

    # createPortfolio requires at least 1 investment strategy from the user to create an investment portfolio
    def createPortfolio(self, strategy=0, investUSD=0):
        if not strategy:
            print("Please specify an investment strategy.")
            return -1

        if not investUSD:
            print("Please deposit a minimum of $5000 USD.")
            return -1

        money = round(investUSD / 3, 2)
        codes = self.topThreeStocks(strategy)
        try:
            for i, c in enumerate(codes):
                code = yf.Ticker(c)
                self.portfolio[i]["symbol"] = c
                self.portfolio[i]["52WeekChange"] = code.info["52WeekChange"]
                self.portfolio[i]["currentPrice"] = code.info["currentPrice"]
                self.portfolio[i]["investedUSD"] = money

        except TypeError:
            print("Unable to read stock codes!")


if __name__ == "__main__":
    s = StockAPI()

    # User must specify a single strategy and deposit a minimum of $5000 USD to create portfolio (25 seconds turnaround time)
    s.createPortfolio(QUALITY, 5000)

    print("*** Portfolio Results ***")
    print(json.dumps(s.portfolio, sort_keys=True, indent=4))
