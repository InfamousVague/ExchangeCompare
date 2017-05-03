# Setup

To setup this project insure you have node installed then simply run 

`npm install && npm start`

Congrats, you're up and running!


# API

### Route: `/exchanges`
### Method: `get`
### Function: `List supported exchanges`
### Response
```
{"exchanges":["poloniex","bittrex"]}
```
### Example: `http://localhost:8008/exchanges`


---

### Route: `/rates`
### Method: `get`
### Function: `List current exchange rates`
### Response
```
{"poloniex":{"BTC_LTC":"0.01100510","BTC_ETH":"0.05260000","BTC_DASH":"0.05905545"},"bittrex":{"BTC_LTC":0.01100089,"BTC_ETH":0.0526,"BTC_DASH":0.05956077}}
```
### Example: `http://localhost:8008/rates`


---

### Route: `/supportedCurrencies/:exchange`
### Method: `get`
### Function: `List currently supported currencies by exchange`
### Response
```
[
  "AMP",
  "ARDR",
  "BCN",
  "BCY",
  "BELA",
  "BLK",
  "BTC",
  "BTCD",
  "BTM",
  "BTS",
  "BURST",
  "CLAM",
  "DASH",
  "DCR",
  "DGB",
  ...
]
```
### Example: `http://localhost:8008/supportedCurrencies/:poloniex`



---

### Route: `/total/:currency/:total`
### Method: `get`
### Function: `List current total currency you can purchase with base currency`
### Response
```
{"cheapest":"0.05260000","cheapestExchange":"poloniex","totals":{"poloniex":380.22813688212926,"bittrex":377.3679603657979}}
```
### Example: `http://localhost:8008/total/BTC_ETH/20`


---

### Route: `/compare/:exchangeA/:exchangeB/:currency/:total`
### Method: `get`
### Function: `Compare two exchanges to see which offers the most currency for your base currency`
### Response
```
{"cheapestTotal":377.3679603657979,"cheapestExchangeName":"bittrex","savings":2.8601765163313644}
```
### Example: `http://localhost:8008/compare/poloniex/bittrex/BTC_ETH/20`


---

### Route: `/bestDeal/:currency`
### Method: `get`
### Function: `Find the best deal out of all supported exchanges`
### Response
```
{"cheapest":"0.05257891","cheapestExchange":"poloniex"}
```
### Example: `http://localhost:8008/bestDeal/BTC_ETH`



# Side Notes

## Exchanges
you can easily extened this API and add more exchanges by adding an exchange module and ensuring it returns data in the expected format `<basecurrency-exchangeForCurrency>: <current_price_in_base>` then add it to the list of exchanges in `index.js`