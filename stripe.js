// This is your test secret API key.
const stripe = require('stripe')('sk_test_51MquILLoPs88AGuiyYPPrp9devP3U2GeiEQ7kC1oP1Jodqb3w0nOfiYgzOmPhkdsKsuaPSYQROAFNJSw5ZLKJILT00R8djNWaY');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/orders', );

app.listen(4242, () => console.log('Running on port 4242'));