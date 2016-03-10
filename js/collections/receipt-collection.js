/*global Backbone, jQuery, _, ENTER_KEY */
var BedeCasino = BedeCasino || {};
"use strict";

// Create the collection for 'Placed Bets' and choose where it is loaded from
BedeCasino.ReceiptCollection = Backbone.Collection.extend({
  model: BedeCasino.ReceiptModel
});