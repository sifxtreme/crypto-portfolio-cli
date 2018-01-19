const request = require('request-promise')

var twilio = require('twilio')
var accountSid = process.env.TWILIO_SID
var authToken = process.env.TWILIO_TOKEN

var client = new twilio(accountSid, authToken)

let getTotalPortfolioPrice = async function() {
  const cmc = await request({
    url: `https://api.coinmarketcap.com/v1/ticker/?limit=0`,
    json: true,
  })

  const coins = JSON.parse(process.env.CRYPTO_HOLDINGS)

  cmc.forEach(function(x){
    const symbol = x.symbol
    if(coins[symbol] && !coins[symbol].info){
      coins[symbol].info = x
    }
  })
  
  let sum = 0
  for(coin in coins){
    const amount = coins[coin].amount
    const price = coins[coin].info.price_usd
    const total = price * amount
    // console.log(coin, '|', price, '|', amount, '|', total.toFixed(2))
    sum += total
  }

  return sum
};

let profitLossPercentage = async function() {
  let initialInvestment = process.env.CRYPTO_INITIAL_INVESTMENT
  let total = await getTotalPortfolioPrice()

  return (total/initialInvestment) * 100.0
}

let messageUser = async function(){
  const profitLoss = await profitLossPercentage()
  console.log(profitLoss)
  client.messages.create({
    body: profitLoss.toFixed(),
    to: process.env.TWILIO_TO_NUMBER,
    from: process.env.TWILIO_FROM_NUMBER
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.log(error))
};

const second = 1000
const minute = second * 60
const hour = minute * 60
const interval = hour * 24

messageUser()

setInterval(function () { 
  messageUser()
}, interval);

require('http').createServer((req, res) => {
  res.end('▲ Hello World')
}).listen(process.env.PORT)






