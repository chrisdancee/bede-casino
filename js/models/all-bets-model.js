var BedeCasino = BedeCasino || {};
"use strict";

//Create the 'All Bets' model. As all of the collections hold different data, I chose to use different models
BedeCasino.BetModel = Backbone.Model.extend({
  defaults: {
    "bet_id": "",
    "event": "",
    "name": "",
    "odds": {
      "numerator": 0,
      "denominator": 0
    }
  }
});