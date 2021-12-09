from typing import List, Type
from datetime import date
import yfinance as yf
import requests
import json
import sys

# Investment Strategy Constants
QUALITY = 3
VALUE = 4
SORTBY = "returnOnEquity"
SYMBOL = "symbol"
CURRENTPRICE = "currentPrice"

"""
The StockAPI class utilizes the Yahoo Finance API to get stock information and analyzes
which stocks are the best to purchase for each of the 5 different investment strategies.
"""


class StockAPI:
    def __init__(self):
        # self.investUSD = investUSD
        self.ethicalStocks = ["GILD", "CRM", "FSLR", "KMB", "HPE"]
        self.growthStocks = ["WOOF", "LYB", "NLSN", "UPST", "ORCL"]
        self.indexStocks = ["FNILX", "VOO", "SPY", "IVV", "SWPPX"]
        self.qualityStocks = ["FTNT", "AMAT", "COF", "GNRC", "DVN"]
        self.valueStocks = ["BAC", "KHC", "VZ", "DVA", "BK"]
        self.portfolio = []

    # checkStrategy is a helper function that finds the strategy type based on the integer value
    def checkStrategy(self, strategy: int):
        strategyType = None
        if strategy == 1:
            return self.ethicalStocks
        elif strategy == 2:
            return self.growthStocks
        elif strategy == 3:
            return self.indexStocks
        elif strategy == 4:
            return self.qualityStocks
        elif strategy == 5:
            return self.valueStocks
        else:
            print("Invalid input strategy!")
            return 0

    # topThreeStocks is a helper function that finds the top 3 stocks based on 52WeekChange value
    def topThreeStocks(self, strategy: int):
        strategyType = self.checkStrategy(strategy)
        if not strategyType:
            print("Please specify a strategy type.")
            return 0

        try:
            stockList = []

            for s in strategyType:
                code = yf.Ticker(s)
                stockList.append(code.info)

            stockList = sorted(stockList, key = lambda x: x[SORTBY])[-3:]
            return stockList

        except requests.exceptions.ConnectionError:
            print("Connection error, please check your internet.")
            eixt(0)

        except Exception:
            print("Invalid stock code, please try again.")
            exit(0)

    # createPortfolio requires at least 1 investment strategy from the user to create an investment portfolio
    def createPortfolio(self, strategy=0, investUSD=0):
        if not strategy:
            print("Please specify an investment strategy.")
            return -1

        if not investUSD:
            print("Please deposit a minimum of $5000 USD.")
            return -1
        codes = self.topThreeStocks(strategy)
        if codes:
            for code in codes:
                print(code["shortName"])

                self.portfolio.append({
                SYMBOL         : code["shortName"],
                SORTBY         : code[SORTBY],
                CURRENTPRICE   : code[CURRENTPRICE]
                })

            # The investing money will depends on the 52 weekschange ratio
            totalChange = sum([portfolio[SORTBY] for portfolio in self.portfolio])
            for portfolio in self.portfolio:
                portfolio["investedUSD"] = investUSD * portfolio[SORTBY] / totalChange
            return 1
        else:
            print('ERROR: Unable to retrieve the stock code...')
            return -1


if __name__ == "__main__":
    s = StockAPI()

    # User must specify a single strategy and deposit a minimum of $5000 USD to create portfolio (25 seconds turnaround time)
    code = s.createPortfolio(5, 5000)
    print('ERROR CODE: ' + str(code))
    print("*** Portfolio Results ***")
    print(json.dumps(s.portfolio, sort_keys=True, indent=4))
