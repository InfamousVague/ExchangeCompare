module.exports = (ctx, currency, total) => {
    let cheapest = false
    let cheapestExchange = false
    let totals = {}

    const currentRates = {}

    Object.keys(ctx.state.exchanges).map(exchange => {
        currentRates[exchange] = ctx.state.exchanges[exchange].getCurrentRates().rates
    })

    Object.keys(currentRates).map(exchange => {
        if (!cheapest || currentRates[exchange][currency] < cheapest) {
            cheapest = currentRates[exchange][currency]
            cheapestExchange = exchange
        }

        totals[exchange] = total / currentRates[exchange][currency]
    })
    
    ctx.body = { cheapest, cheapestExchange, totals }
}