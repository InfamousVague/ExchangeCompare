const Koa = require('koa')
const route = require('koa-route')
const app = new Koa()

const fs = require('fs')

const { rates, bestDeal, total, compare, exchanges, supportedCurrencies } = require('./routes')

const { Poloniex, Bittrex, Kraken, BTCe } = require('./exchanges')

const poloniex = new Poloniex(['BTC_ETH', 'BTC_LTC', 'BTC_DASH'], '_')
const bittrex = new Bittrex(['BTC-ETH', 'BTC-LTC', 'BTC-DASH'], '_')
const kraken = new Kraken(['BTC-ETH', 'BTC-LTC', 'BTC-DASH'], '_')
const btce = new BTCe(['BTC-ETH', 'BTC-LTC', 'BTC-DASH'], '_')

// Pass supported exchanges into ctx for usage in routes
app.use(function *(ctx){
  this.state.exchanges = {
      poloniex,
      bittrex,
      kraken,
      btce
  }
  ctx.next()
})


// Track history
const history = [] // Ideally this would go in a DB
app.use(function *(ctx){
  const exchangeRates = {
      poloniex: poloniex.getCurrentRates().rates,
      bittrex: bittrex.getCurrentRates().rates,
      btce: bittrex.getCurrentRates().rates,
      kraken: bittrex.getCurrentRates().rates
  }

  history.push({
      date: Date.now(),
      exchanges: exchangeRates
  })

  if (history.length > 10) history.shift()

  this.state.history = history

  ctx.next()
})

// Web View
let webview = '';
fs.readFile(`${__dirname}/view/index.html`, 'utf8', function(err, html){
    webview = html
})

app.use(route.get('/', ctx => {
    ctx.body = webview
}))

// List supported exchanges
app.use(route.get('/exchanges', exchanges))

// Get the current rates across all exchanges
app.use(route.get('/rates', rates))

// Get a list of supported currencies by exchange
app.use(route.get('/supportedCurrencies/:exchange', supportedCurrencies))

// Find out what the best deal is for trading the provided currency
app.use(route.get('/bestDeal/:currency', bestDeal))

// Find out how much of a given currency you can buy with base currency
app.use(route.get('/total/:currency/:total', total))

// Find out how much you can save using one exchange vs another
app.use(route.get('/compare/:exchangeA/:exchangeB/:currency/:total', compare))

// Get rate history
app.use(route.get('/history', ctx => {
    ctx.body = ctx.state.history
}))

app.listen(8008)

// https://www.youtube.com/watch?v=VuNIsY6JdUw
