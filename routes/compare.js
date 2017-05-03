module.exports = (ctx, exchangeA, exchangeB, currency, total) => {
    const exchanges = {}

    Object.keys(ctx.state.exchanges).map(exchange => {
        exchanges[exchange] = ctx.state.exchanges[exchange].getCurrentRates().rates
    })

    const exchangeAInfo = exchanges[exchangeA]
    const exchangeBInfo = exchanges[exchangeB]

    const totalCoinFromA = total / exchangeAInfo[currency]
    const totalCoinFromB = total / exchangeBInfo[currency]
    
    const cheapestTotal = (totalCoinFromA < totalCoinFromB) ? totalCoinFromA : totalCoinFromB
    const savings = (totalCoinFromA < totalCoinFromB) ? totalCoinFromB - totalCoinFromA : totalCoinFromA - totalCoinFromB
    const cheapestExchangeName = (totalCoinFromA < totalCoinFromB) ? exchangeA : exchangeB

    ctx.body = { 
        cheapestTotal, 
        cheapestExchangeName, 
        savings 
    }
}