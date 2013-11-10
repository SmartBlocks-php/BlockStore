define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/search.html',
    './featured_block_thumb'
], function ($, _, Backbone, search_tpl, FeaturedThumb) {
    var View = Backbone.View.extend({
        tagName: "div",
        className: "block_search",
        initialize: function () {
            var base = this;
        },
        init: function (search_query) {
            var base = this;
            base.query = search_query;

            base.render();
            base.registerEvents();

        },
        render: function () {
            var base = this;

            var template = _.template(search_tpl, {
                query: base.query
            });
            base.$el.html(template);
            base.renderResults();
        },
        renderResults: function () {
            var base = this;

            var results = SmartBlocks.Blocks.BlockStore.Data.bundle_blocks.filter(function (block) {
                return block.get('name').toLowerCase().indexOf(base.query.toLowerCase()) !== -1 || block.get('description').toLowerCase().indexOf(base.query.toLowerCase()) !== -1;
            });

            base.$el.find(".block_list").html('');
            for (var k in results) {
                (function (block) {
                    var thumb = new FeaturedThumb({ model: block });
                    var div = $(document.createElement('div'));
                    div.addClass('col-md-6');
                    div.append(thumb.$el);
                    base.$el.find(".block_list").append(div);
                    thumb.init();
                })(results[k]);
            }
        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});