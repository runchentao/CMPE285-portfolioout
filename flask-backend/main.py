from typing import Deque, List, Type
from datetime import date
from pandas.core.indexes.base import Index
import yfinance as yf
import requests
import json
import sys
import pandas as pd
import itertools

# Investment Strategy Constants
ETHICAL = 1
GROWTH = 2
INDEX = 3
QUALITY = 4
VALUE = 5
SYMBOL = "symbol"
RETURN = "return"
CURRENTPRICE = "currentPrice"
FIVEDAYTREND = "fiveDayTrend"

"""
The StockAPI class utilizes the Yahoo Finance API to get stock information and analyzes
which stocks are the best to purchase for each of the 5 different investment strategies.
"""


class StockAPI:
    def __init__(self):
        self.investUSD = 0
        self.ethicalStocks = ["GILD", "CRM", "FSLR", "KMB", "HPE"]
        self.growthStocks = ["WOOF", "LYB", "NLSN", "UPST", "ORCL"]
        self.indexStocks = ["GM", "PILBF", "FTNT", "MXL", "CNC"]
        self.qualityStocks = ["FTNT", "AMAT", "COF", "GNRC", "DVN"]
        self.valueStocks = ["BAC", "KHC", "VZ", "DVA", "BK"]
        self.portfolio = []
        self.sortby = {ETHICAL: "returnOnEquity",
                       GROWTH: "returnOnEquity",
                       INDEX: "returnOnEquity",
                       QUALITY: "returnOnEquity",
                       VALUE: "returnOnEquity"}

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
                weeklyTrend = code.history(
                    period="5d", interval="1d", actions=False)
                weeklyGains = []
                for index, row in weeklyTrend.iterrows():
                    weeklyGains.append(
                        [index.strftime('%m/%d'), row["Close"] - row["Open"]])
                # open = weeklyTrend["Open"].tolist()
                # close = weeklyTrend["Close"].tolist()
                stockList.append((code.info, weeklyGains))

            stockList = sorted(
                stockList, key=lambda x: x[0][self.sortby[strategy]])[-3:]
            return stockList

        except requests.exceptions.ConnectionError:
            print("Connection error, please check your internet.")
            exit(0)

        except Exception:
            print("Error exception, please try again.")
            exit(0)

    # createPortfolio requires at least 1 investment strategy from the user to create an investment portfolio
    def createPortfolio(self, strategy=0, investUSD=0):
        if not type(strategy) == int or strategy < 0 or strategy > 5:
            print("Please specify a valid investment strategy.")
            return -1

        if not type(investUSD) == int or investUSD < 5000:
            print(
                "Please specify a valid deposit amount, a minimum deposit is $5000 USD.")
            return -1
        self.investUSD = investUSD
        codes = self.topThreeStocks(strategy)
        if codes:
            chartData = []
            chartIdx = ["Date"]
            for code in codes:
                chartIdx.append(code[0]["shortName"])
            for code in codes:
                print(code[0]["shortName"])

                self.portfolio.append({
                    SYMBOL: code[0]["shortName"],
                    RETURN: code[0][self.sortby[strategy]],
                    CURRENTPRICE: code[0][CURRENTPRICE],
                    FIVEDAYTREND: code[1]
                })
                chartData.append(code[1])

            # The investing money will depends on the 52 weekschange ratio
            totalChange = sum([portfolio[RETURN]
                              for portfolio in self.portfolio])
            for portfolio in self.portfolio:
                portfolio["investedUSD"] = investUSD * \
                    portfolio[RETURN] / \
                    totalChange
            for portfolio in self.portfolio:
                portfolio["shares"] = portfolio["investedUSD"] / \
                    portfolio["currentPrice"]

            # Organize data for chart display
            flat_list = [item for sublist in chartData for item in sublist]
            df = pd.DataFrame(flat_list)
            grouped_df = df.groupby(0)
            grouped_lists = grouped_df[1].apply(list)
            grouped_lists = grouped_lists.reset_index()
            grouped_lists = grouped_lists.values.tolist()
            formattedChartData = []
            formattedChartData.append(chartIdx)
            for pair in grouped_lists:
                date, arr = pair
                queue = Deque(arr)
                queue.appendleft(date)
                formattedChartData.append(tuple(queue))
            self.portfolio.append(formattedChartData)
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
    # s.get5DayHistory()
