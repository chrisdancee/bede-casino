/*global $ */
var BedeCasino = BedeCasino || {};
'use strict';

//Set a global variable for Decimal Odds, could have done this locally for each view however
var DEC_ODDS = false;

//Once the DOM is ready we create the app
$(function () {
  new BedeCasino.AppView();
});