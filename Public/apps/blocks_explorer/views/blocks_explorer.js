define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/blocks_explorer.html',
    './featured_block_thumb'
], function ($, _, Backbone, blocks_explorer_tpl, FeaturedBlockThumb) {
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
            base.renderFeaturedBlocks();
        },
        renderFeaturedBlocks: function () {
            var base = this;

            var featured_blocks = SmartBlocks.Blocks.BlockStore.Data.bundle_blocks.filter(function (block) {
                return block.get("featured") === true;
            });

            base.$el.find(".featured_blocks").html('');
            for (var k in featured_blocks) {
                (function (block) {
                    var thumb = new FeaturedBlockThumb({ model: block });
                    base.$el.find(".featured_blocks").append(thumb.$el);
                    thumb.$el.addClass("col-md-6 col-sm-6");
                    thumb.init();
                })(featured_blocks[k]);
            }
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});