define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/tag_thumb.html'
], function ($, _, Backbone, tag_thumb_tpl) {
    var View = Backbone.View.extend({
        tagName: "a",
        className: "tag_thumb",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;
            base.$el.attr('href', 'javascript:void(0);');
            base.render();
            base.registerEvents();
        },
        render: function () {
            var base = this;

            var template = _.template(tag_thumb_tpl, {
                tag: base.model
            });
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        },
        setAction: function (name, callback) {
            var base = this;
            base.$el.find('.action').html(name);
            base.$el.addClass('actionable');
            base.$el.click(function () {
                if (callback) {
                    callback(base.model);
                }
            });
        }
    });

    return View;
});