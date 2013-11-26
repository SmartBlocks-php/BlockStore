define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/block_creation.html'
], function ($, _, Backbone, block_creation_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "block_creation",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(block_creation_tpl, {});
            base.$el.html(template);

        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});