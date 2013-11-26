define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/main.html',
    './block_creation'
], function ($, _, Backbone, blocks_manager_tpl, CreationView) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "blocks_manager",
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

            var template = _.template(blocks_manager_tpl, {});
            base.$el.html(template);
        },
        registerEvents: function () {
            var base = this;
        },
        setSubapp: function (view) {
            var base = this;
            base.$el.find(".subapp_container").html(view.$el);
        },
        showCreateBlock: function () {
            var base = this;
            var subapp = new CreationView();
            base.setSubapp(subapp);
            subapp.init();
        }
    });

    return View;
});