var BedeCasino = BedeCasino || {};
"use strict";

//Create the 'Placed Bets' model.
BedeCasino.ReceiptModel = Backbone.Model.extend({
  defaults: {
    "bet_id": "",
    "event": "",
    "name": "",
    "odds": {
      "numerator": 0,
      "denominator": 0
    },
    "stake": 0,
    "transaction_id": 0
  }
});