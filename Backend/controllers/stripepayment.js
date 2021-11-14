const stripe = require("stripe")("sk_test_cR2448fng9i9fw5YZZ8o9BHk00iNoTZ0IO")
const { v4: uuidv4 } = require('uuid');

exports.makePayment = (req, res) => {
    const {products, token} = req.body;
    console.log("Products", products)

    let amount = 0;
    products.map(p => {
        amount = amount + p.price
    })

    const idempotencyKey = uuidv4();

    return stripe.customers.create({
        email: token.email,
        source: token.id,
    }).then(customer => {
        stripe.charges.create({
            amount : amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: "nipun test account",
            shipping:{
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_linn2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                }
            }
        }, {idempotencyKey})
        .then(result => res.json(result))
        .catch(err => console.log(err));
    })
  };