var BedeCasino = BedeCasino || {};
"use strict";

//Create the 'My Bets' view
BedeCasino.MyBetsView = Backbone.View.extend({
  //Defines how the models will be rendered into HTML within the view
  tagName: 'tr',
  template: _.template($('#my-bets-template').html()),
  className: 'my-bet-item',

  //Set any event triggers for the view
  events: {
    'click .remove-my-bets': 'removeFromMyBets',
    'keyup': 'keyAction'
  },

  //Initialize the view. Sets listeners for the Decimal odds trigger and models being destroyed
  //Adds models within the collection to the view and renders the view
  initialize: function () {
    Backbone.on('decOdds', this.render, this);
    this.listenTo(this.model, 'destroy', this.remove);
    $('.my-bets').append(this.el);
    this.render();
  },

  render: function () {
    var renderedTemplate = this.template(this.model.attributes);
    this.$el.html(renderedTemplate);
  },

  //Destroys the model in question
  destroy: function () {
    this.model.destroy();
  },

  //Clones the model, adds it to the 'All Bets' collection and destroys it. Calls the keyAction function to update stake and return totals
  removeFromMyBets: function () {
    var model = this.model.clone();
    model.unset('stake');
    BedeCasino.betsCollection.add(model);
    this.destroy();
    this.keyAction();
  },

  //If a key is pressed within the view this function will update stake and return calculations
  keyAction: function (e) {
    //Keep stake to 2dp 
    $(".stake").bind('change', function () {
      $(this).val(function (i, v) {
        if (isNaN(v)) {
          v = 0;
        }
        return parseFloat(v).toFixed(2);
      });
    });
    this.calcTotalStake();
    this.calcEachReturn();
    this.calcTotalReturn();
  },

  //Calculates the total stake
  calcTotalStake: function () {
    var sum = 0;
    //For each stake input within the view
    $(".stake").each(function () {
      //If stake matches currency regex
      if ($(this).val().match(/^(\d*\.\d{1,2}|\d+)$/)) {
        //Add the value of the current input to the running total
        sum += parseFloat($(this).val());
      }
    });
    //Finally set the total stake to a currency
    $('#totalstake').val(parseFloat(sum).toFixed(2));
  },

  //Calculates each individual return
  calcEachReturn: function () {
    var ret = 0;
    var stake = this.$("input.stake").val();
    var den = this.model.attributes.odds.denominator;
    var num = this.model.attributes.odds.numerator;
    //If stake matches currency regex then calculate the return and update the value of the return field
    if (stake.match(/^(\d*\.\d{1,2}|\d+)$/)) {
      ret = (((num / den) + 1) * stake).toFixed(2);
      this.$(".returns").val(ret);
    }
    //If stake is made blank, make the return field equal 0.00
    if (stake === '') {
      ret = 0.00;
      ret = ret.toFixed(2);
      this.$(".returns").val(ret);
    }
  },

  //Calculate the total return
  calcTotalReturn: function () {
    var tot = 0;
    $(".returns").each(function () {
      tot += parseFloat($(this).val());
    });
    $('#totalreturns').val(parseFloat(tot).toFixed(2));
  }
});