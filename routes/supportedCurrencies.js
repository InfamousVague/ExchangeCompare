module.exports = (ctx, exchange) => {
    ctx.body = ctx.state.exchanges[exchange].fetchSupportedCurrencies()
}