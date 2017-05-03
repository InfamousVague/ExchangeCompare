module.exports = (ctx) => {
    const currentRates = {}

    Object.keys(ctx.state.exchanges).map(exchange => {
        currentRates[exchange] = ctx.state.exchanges[exchange].getCurrentRates().rates
    })

    ctx.body = currentRates
}