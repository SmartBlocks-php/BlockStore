define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/main.html',
    './blocks_explorer',
    './block_show'
], function ($, _, Backbone, main_tpl, BlocksExplorerView, BlockShowView) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "blocks_explorer_app",
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
            var template = _.template(main_tpl, {});
            base.$el.html(template);
        },
        showExplorer: function () {
            var base = this;
            var explorer = new BlocksExplorerView();
            base.$el.find(".subapp_container").html(explorer.$el);
            explorer.init();
        },
        showBlock: function (block) {
            var base = this;
            var show_view = new BlockShowView({ model: block });
            base.$el.find(".subapp_container").html(show_view.$el);
            show_view.init();
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});