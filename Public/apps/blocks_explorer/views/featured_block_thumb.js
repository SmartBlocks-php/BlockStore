define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/featured_block_thumb.html'
], function ($, _, Backbone, featured_block_thumb_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "featured_block_thumb",
        initialize: function (obj) {
            var base = this;
            base.block = obj.model;
        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(featured_block_thumb_tpl, {
                block: base.block
            });
            base.$el.html(template);

        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});