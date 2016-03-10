/*global Backbone, jQuery, _, ENTER_KEY */
var BedeCasino = BedeCasino || {};
"use strict";

// Create the collection for 'All Bets' and choose where it is loaded from
// https://bedefetechtest.herokuapp.com/v1/ returned a 404 and so I created my own test JSON file hosted online
BedeCasino.BetsCollection = Backbone.Collection.extend({
  model: BedeCasino.BetModel,
  //url: 'https://bedefetechtest.herokuapp.com/v1/'
  url: 'https://api.myjson.com/bins/4dqx9'
});