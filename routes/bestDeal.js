module.exports = (ctx, currency) => {
    let cheapest = false
    let cheapestExchange = false

    const currentRates = {}

    Object.keys(ctx.state.exchanges).map(exchange => {
        currentRates[exchange] = ctx.state.exchanges[exchange].getCurrentRates().rates
    })

    Object.keys(currentRates).map(exchange => {
        if (!cheapest || currentRates[exchange][currency] < cheapest) {
            cheapest = currentRates[exchange][currency]
            cheapestExchange = exchange
        }
    })
    
    ctx.body = { cheapest, cheapestExchange }
}