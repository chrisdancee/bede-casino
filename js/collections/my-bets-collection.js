/*global Backbone, jQuery, _, ENTER_KEY */
var BedeCasino = BedeCasino || {};
"use strict";

// Create the collection for 'My Slip' and choose where it is loaded from
// The url would be used on a POST, as the https://bedefetechtest.herokuapp.com/v1/ wasn't working I set up a local server for testing
BedeCasino.MyBetsCollection = Backbone.Collection.extend({
  model: BedeCasino.MyBetModel,
  url: 'https://bedefetechtest.herokuapp.com/v1/'
  //url: 'http://localhost:3000/bets'
});
