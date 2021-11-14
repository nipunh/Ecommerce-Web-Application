var braintree = require("braintree");


var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   '3738drxkxyxpx6kb',
    publicKey:    'r527nnw3h34q7x38',
    privateKey:   '64ce39e5f85093fcf767e4a931d84975'
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).send(error)
        }else{
            res.send(response)
        }

      });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.PaymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err){
              res.status(500).send(error)
          }else{
              res.json(result)
          }
      });
};