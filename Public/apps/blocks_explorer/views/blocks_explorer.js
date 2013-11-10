define([
    'jquery',
    'underscore',
    'backbone',
    'text!../templates/blocks_explorer.html',
    './featured_block_thumb',
    './search'
], function ($, _, Backbone, blocks_explorer_tpl, FeaturedBlockThumb, SearchView) {
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
//                    thumb.$el.addClass("col-md-6 col-sm-6");
                    var div = $(document.createElement('div'));
                    div.addClass('col-md-6 col-sm-6');
                    div.append(thumb.$el);
                    base.$el.find(".featured_blocks").append(div);
                    thumb.init();
                })(featured_blocks[k]);
            }
        },
        launchSearch: function () {
            var base = this;
            var query =  base.$el.find(".search_input").val();
            if (query != "") {
                base.$el.find(".featured_blocks_").hide(200, function () {
                    base.$el.find(".search").show(200, function () {
                        var search_view = new SearchView();
                        base.$el.find('.search_view_container').html(search_view.$el);
                        search_view.init(query);
                    });
                });
            } else {
                base.hideSearch();
            }

        },
        hideSearch: function () {
            var base = this;
            base.$el.find(".search").hide(200, function () {
                base.$el.find(".featured_blocks_").show(200, function () {

                });
            });
        },
        registerEvents: function () {
            var base = this;

            base.$el.delegate(".close_search_button", 'click', function () {
                base.hideSearch();
            });

            var timer = 0;
            base.$el.delegate(".search_input", "keyup", function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    base.launchSearch();
                }, 300);
            });
        }
    });

    return View;
});