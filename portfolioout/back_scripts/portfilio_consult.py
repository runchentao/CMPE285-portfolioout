from investings import Investings as inv

class Portfilio_Consultant:
    def __init__(self, strategies, amount):
        self.strategies = strategies
        self.amount = amount
        self.inv = inv()
        self.investment_functions = \
        {'ethical_invest': self.inv.ethical_investing,
         'growth_invest' : self.inv.growth_investing,
         'index_invest'  : self.inv.index_investing,
         'quality_invest': self.inv.quality_investing,
         'value_invest'  : self.inv.value_investing
        }
    # inputs: Nothing (using strategies and amount)
    # outputs: A list of dictionary: [{'APPL': 500} ...]
    def get_top_stocks(self):
        assign_price = []
        for  strategy in self.strategies:
            if strategy:
                if strategy in self.investment_functions:
                    top_three = self.investment_functions[strategy]()
                    print(top_three)
                    assign_price.append(self.get_price(top_three))
                else:
                    raise ValueError("Given investing method:" +\
                                    strategy +"is not supporting")
        if not assign_price:
            raise ValueError("Choose at least one strategy...")
        return assign_price

    # inputs: three different stocks: APPL, GOOGL, FB
    # outputs: A dictionary: {'APPL': 500 , 'GOOGL':100 ... }
    def get_price(self, stocks):
        return {'test': 500}
        pass
