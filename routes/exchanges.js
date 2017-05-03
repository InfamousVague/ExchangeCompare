module.exports = (ctx, currency) => {
    const exchanges = []

    Object.keys(ctx.state.exchanges).map(exchange => {
        exchanges.push(exchange)
    })

    ctx.body = { exchanges }
}