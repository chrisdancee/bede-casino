var BedeCasino = BedeCasino || {};
"use strict";

//Create the App view
BedeCasino.AppView = Backbone.View.extend({
  el: $("body"),

  //Set event triggers, in this case posting a bet and converting odds
  events: {
    'click .makebet': 'postBets',
    'click .convert-odds': 'convertOdds'
  },

  //Instantiates, fetches and listenTo all of the collections instances
  initialize: function () {
    BedeCasino.betsCollection = new BedeCasino.BetsCollection();
    BedeCasino.myBetsCollection = new BedeCasino.MyBetsCollection();
    BedeCasino.receiptCollection = new BedeCasino.ReceiptCollection();
    BedeCasino.betsCollection.fetch();

    this.listenTo(BedeCasino.betsCollection, 'add', function (modelOne) {
      // Instantiate a new view and pass in the model instance
      BedeCasino.bets = new BedeCasino.AllBetsView({
        model: modelOne
      });
    });

    this.listenTo(BedeCasino.myBetsCollection, 'add', function (modelTwo) {
      BedeCasino.myBets = new BedeCasino.MyBetsView({
        model: modelTwo
      });
    });

    this.listenTo(BedeCasino.receiptCollection, 'add', function (modelThree) {
      BedeCasino.receipt = new BedeCasino.ReceiptView({
        model: modelThree
      });
    });
  },

  //The function to POST bets to the server
  postBets: function () {
    //For each model in the collection
    BedeCasino.myBetsCollection.each(function (model, index) {
      //Get the value of the stake input and parse to an int
      var i = $('input.stake').eq(index).val();
      i = parseFloat(i);
      //Clone the model before it is modified and move back to the 'All Bets' collection
      var modelclone = model.clone();
      BedeCasino.betsCollection.add(modelclone);
      //If a stake has been inputted, add a stake to the model, unset unecessary attributes and POST the model
      if (i > 0.00) {
        model.attributes.stake = i;
        model.unset('event');
        model.unset('name');
        model.save({}, {
          //If successful notify the user and add a receipt the the 'Placed Bets' collection
          success: function (model, response) {
            toastr["success"]("Your bet was placed", "Success!")
            BedeCasino.receiptCollection.add(response);
          },
          //If unsuccessful, catch the response and handle it
          //I couldn't test this correctly as the server didn't respond but it will show the user an error
          error: function (model, response) {
            if (response.status === 404) {
              toastr["error"]("Could not reach server", "An Error Occurred!")
            } else if (response.status === 400) {
              toastr["error"]("Invalid bet! Please try again", "An Error Occurred!")
            } else {
              toastr["error"]("Invalid bet! Please try again", "An Error Occurred!")
            }
          }
        });
      }
    });
    //Destroy all models in this collection and zero the total returns and total stake
    _.invoke(BedeCasino.myBetsCollection.toArray(), 'destroy');
    $('#totalstake').val(parseFloat(0).toFixed(2));
    $('#totalreturns').val(parseFloat(0).toFixed(2));
  },

  //Function to trigger re-rendering of views when the Decimal Odds flag is changed
  convertOdds: function () {
    if (DEC_ODDS) {
      DEC_ODDS = false;
      Backbone.trigger('decOdds');
    } else {
      DEC_ODDS = true;
      Backbone.trigger('decOdds');
    }
  }
});