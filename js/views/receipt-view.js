var BedeCasino = BedeCasino || {};
"use strict";

//Create the 'My Placed Bets' view
BedeCasino.ReceiptView = Backbone.View.extend({
  //Defines how the models will be rendered into HTML within the view
  tagName: 'tr',
  template: _.template($('#receipt-template').html()),
  className: 'receipt-item',

  //Initialize the view. Sets listener for the Decimal odds trigger
  //Adds models within the collection to the view and renders the view
  initialize: function () {
    Backbone.on('decOdds', this.render, this);
    $('.receipt').append(this.el);
    this.render();
  },

  //Render the view
  render: function () {
    var renderedTemplate = this.template(this.model.attributes);
    this.$el.html(renderedTemplate);
  }
});