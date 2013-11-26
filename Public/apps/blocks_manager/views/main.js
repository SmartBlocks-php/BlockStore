define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/main.html',
    './block_creation',
    './block_lister',
    './block_edition'
], function ($, _, Backbone, blocks_manager_tpl, CreationView, BlocksLister, EditionView) {
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
        },
        showMyBlocks: function() {
            var base = this;
            var lister = new BlocksLister();
            base.setSubapp(lister);
            lister.init();
        },
        showEdition: function (block) {
            var base = this;
            var edition = new EditionView({
                model: block
            });
            base.setSubapp(edition);
            edition.init();
        }
    });

    return View;
});