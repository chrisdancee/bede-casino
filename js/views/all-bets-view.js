var BedeCasino = BedeCasino || {};
"use strict";

//Create the 'All Bets' view
BedeCasino.AllBetsView = Backbone.View.extend({
  //Defines how the models will be rendered into HTML within the view
  tagName: 'tr',
  template: _.template($('#bets-template').html()),
  className: 'bet-item',
  
  //Set any event triggers for the view
  events: {
    'click .add-my-bets': 'moveToMyBets',
    'click .convert-odds': 'convertOdds'
  },

  //Initialize the view. Sets listeners for the Decimal odds trigger and models being destroyed
  //Adds models within the collection to the view and renders the view
  initialize: function () {
    Backbone.on('decOdds', this.render, this);
    this.listenTo(this.model, 'destroy', this.remove);
    $('.all-bets').append(this.el);
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

  //Clones the model, adds a stake value to it and adds it the the 'My Bets' collection. Destroys the model in this collection.
  moveToMyBets: function () {
    var model = this.model.clone();
    model.set({
      "stake": 0
    });
    BedeCasino.myBetsCollection.add(model);
    this.destroy();
  }
});