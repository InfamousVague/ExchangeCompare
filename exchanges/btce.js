const fetch = require('node-fetch')

/** Class representing BTCE. */

class BTCe {
    /**
     * Initalize exchange.
     * @param {array} currencies - String values of the currencies you'd like to know about
     * @param {string} seperator - Standardize the seperator between currency names
     */
    constructor(currencies, seperator) {
        this.currencies = currencies
        this.rates = {}
        this.open = false
        this.seperator = seperator
        this.supportedCurrencies = []

        this._populateRates()
        setInterval(this._populateRates.bind(this), 5000)
    }

    _populateRates() {
        this.currencies.map(currency => {
            // This parsing sucks, ideally each exchange will need a parser to standardize things.
            let pair = `${currency.split('-')[1].toLowerCase()}_${currency.split('-')[0].toLowerCase()}`.replace('dash', 'dsh')
            // fetch the inital ticker values
            fetch(`https://btc-e.com/api/3/ticker/${pair}`)
                .then((res) => {
                    return res.text();
                }).then((body) => {
                    const result = JSON.parse(body)[pair]

                    this.rates[currency.replace('-', this.seperator)] = parseFloat(result.last)
                    this.open = true
                }).catch(function(err) {
                    console.log(err)
                })
        })
    }

    /**
     * Get the last known rates for coins we listen to
     * @return {object} error - Error, if any.
     * @return {object} rates - Current (or last known) rates.
     */
    getCurrentRates() {
        if (this.open) {
            return {
                error: false,
                rates: this.rates
            }
        } else {
            return {
                error: 'Connection not yet, or no longer established.',
                rates: (this.rates) ? this.rates : null // Attempt to send last known rates
            }
        }
    }
}

module.exports = BTCe;