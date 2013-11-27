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
                if (base.$el.find(".description").is(":visible")) {
                    base.$el.find(".description").slideUp(500);
                    base.$el.removeClass("expanded");
                } else {
                    base.$el.parent().parent().find(".description").hide();
                    base.$el.parent().parent().find(".block_line_thumb").removeClass("expanded");
                    base.$el.find(".description").slideDown(500);
                    base.$el.addClass("expanded");
                }
            });
        }
    });

    return View;
});