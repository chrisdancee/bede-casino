var BedeCasino = BedeCasino || {};
"use strict";

//Create the 'My Bets' model. Defaults aren't necessary in this case
BedeCasino.MyBetModel = Backbone.Model.extend({
  defaults: {
    "bet_id": "",
    "event": "",
    "name": "",
    "odds": {
      "numerator": 0,
      "denominator": 0
    },
    "stake": 0
  }
});