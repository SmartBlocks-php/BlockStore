define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/block_lister.html',
    './line_thumb'
], function ($, _, Backbone, template, LineThumb) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "block_lister",
        initialize: function () {
            var base = this;
        },
        init: function () {
            var base = this;

            if (SmartBlocks.current_user) {
                base.blocks_list = SmartBlocks.Blocks.BlockStore.Data.bundle_blocks.filter(function (block) {
                    return block.getCreator().get('id') == SmartBlocks.current_user.get('id');
                });
                console.log(base.blocks_list);
            } else {
                base.blocks_list = [];
            }

            base.render();

            base.registerEvents();
        },
        render: function () {
            var base = this;

            var t = _.template(template, {});
            base.$el.html(t);

            for (var k in base.blocks_list) {
                var block = base.blocks_list[k];

                var thumb = new LineThumb({
                    model: block
                });
                var li = $(document.createElement('li'));
                li.html(thumb.$el);
                base.$el.find(".list").append(li);
                thumb.init();
            }

        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});