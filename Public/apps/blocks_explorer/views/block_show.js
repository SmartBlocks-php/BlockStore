define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/block_show.html',
    'moment'
], function ($, _, Backbone, block_show_tpl) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "block_show",
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

            var template = _.template(block_show_tpl, {
                block: base.block
            });
            base.$el.html(template);
            var date = base.block.getLastUpdated();
            base.$el.find(".site_last_update").html(moment(date).fromNow());

        },
        registerEvents: function () {
            var base = this;

            base.$el.find('.nav-tabs a', 'click', function () {
                var elt = $(this);

                base.$el.find('.tab').hide();
                base.$el.find('.' + elt.attr('data-target')).show();

            });
        }
    });

    return View;
});