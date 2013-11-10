define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/blocks_explorer.html'
], function ($, _, Backbone, blocks_explorer_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "blocks_explorer",
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

            var template = _.template(blocks_explorer_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});