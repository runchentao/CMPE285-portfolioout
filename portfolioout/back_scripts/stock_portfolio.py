import sys
from portfilio_consult import Portfilio_Consultant
def main():
    sys.tracebacklimit = 0
    # First two inputs are the investment strategies
    stock_strtagys = sys.argv[1:3]

    # The third input is the investing amount
    investing_amount = sys.argv[3]

    consult = Portfilio_Consultant(stock_strtagys, investing_amount)

    stock_suggestions = consult.get_top_stocks()

    print(stock_suggestions)

    return

if __name__ == "__main__":
    sys.dont_write_bytecode = True
    main()
