# crypto

Keep track of your Portfolio

Save several environment variables (use Twilio if you would like to get a text with your portfolio percentage). 

```
export TWILIO_SID=XXXXXX
export TWILIO_TOKEN=XXXXXX
export TWILIO_FROM_NUMBER=+XXXXXX
export TWILIO_TO_NUMBER=+XXXXXX

export CRYPTO_INITIAL_INVESTMENT=1
export CRYPTO_HOLDINGS='{ "BTC":{"amount":1}, "ETH":{"amount":10} }'
```

Then run the following to see how many `$$$` you have

```
npm install
node index.js
```

You should see something like:

```
BTC | 11502.1 | 1 | 11502.10
LTC | 190.621 | 100 | 19062.10
ETH | 1035.86 | 10 | 10358.60
Total 40922.80
```

Every 5 minutes it should also print out your percentage profit/loss

```
Profit/Loss -4.2%
Profit/Loss -3.9%
Profit/Loss -1.4%
Profit/Loss -1.0%
Profit/Loss 0.9%
Profit/Loss -1.2%
Profit/Loss -1.4%
Profit/Loss -1.9%
```

Disclaimer: the numbers currently are just examples...I don't own 1 BTC.

