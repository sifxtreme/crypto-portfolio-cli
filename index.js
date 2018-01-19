var ccxt = require('ccxt')

let runner = async function() {
  const cmc = new ccxt.coinmarketcap()
    
  const markets = await cmc.loadMarkets()

  let pairings = Object.keys(markets)

  const coins = [
    ['BTC', 1],
    ['LTC', 100],
    ['ETH', 10],
  ]

  let sum = 0

  coins.forEach(function(x){
    let coin = x[0]
    let amount = x[1]
    let info = markets[coin + '/USD'] 
    let price = info.info.price_usd
    let total = price * amount
    console.log(coin, '|', price, '|', amount, '|', total.toFixed(2))
    sum += total
  })

  console.log("Total", sum.toFixed(2))

  // console.log (ccxt.exchanges) // print all available exchangesZ
};

runner()

