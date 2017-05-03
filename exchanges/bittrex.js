const fetch = require('node-fetch')


/** Class representing Bittrex. */

class Bittrex {
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

        this.updateTickerValues()
        setInterval(this.updateTickerValues.bind(this), 5000)

        this._populateSupportedCurrencies()
    }

    updateTickerValues() {
        this.currencies.map(currency => {
            // fetch the inital ticker values
            fetch(`https://bittrex.com/api/v1.1/public/getticker?market=${currency}`)
                .then(function(res) {
                    return res.text();
                }).then((body) => {
                    const response = JSON.parse(body)
                    this.rates[currency.replace('-', this.seperator)] = response.result.Last
                }).catch(function(err) {
                    console.log(err)
                })
        })
        this.open = true
    }
    
     _populateSupportedCurrencies() {
        // Fetch supported currencies
        fetch('https://bittrex.com/api/v1.1/public/getcurrencies')
            .then((res) => {
                return res.text();
            }).then((body) => {
                const response = JSON.parse(body)
                response.result.map(currency => {
                    this.supportedCurrencies.push(currency.Currency)
                })
            }).catch(function(err) {
                console.log(err)
            })
    }

    /**
     * Get a list of currencies supported by this exchange
     * @return {array} currencies - Current (or last known) list of currencies.
     */
    fetchSupportedCurrencies() {
        return this.supportedCurrencies
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

module.exports = Bittrex;