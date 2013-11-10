define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/block_show.html'
], function ($, _, Backbone, block_show_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "block_show",
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

            var template = _.template(block_show_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});