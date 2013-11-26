define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/line_thumb.html'
], function ($, _, Backbone, tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "block_line_thumb",
        initialize: function (obj) {
            var base = this;

        },
        init: function () {
            var base = this;

            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(tpl, {
                block: base.model
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
            base.$el.delegate(".show_description_button", "click", function () {
                base.$el.toggleClass("expanded");
            });
        }
    });

    return View;
});