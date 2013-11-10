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
            SmartBlocks.Blocks.GithubBlock.Main.getRepo("SmartBlocks", base.block.get("name"), function (repo) {
                repo.listTags(function (err, tags) {
                    console.log(tags);
                    if (tags[0]) {
                        var tag = tags[0];
                        base.$el.find(".download_button").attr("href", tag.zipball_url);
                        base.$el.find(".download_button").find(".version").html(tag.name);
                    } else {
                        base.$el.find(".download_button").hide();
                    }
                });
                repo.show(function (x, repo) {
                    var date = new Date(repo.pushed_at);
                    base.$el.find(".git_last_update").html(moment(date).fromNow());
                })
            });
            var date = base.block.getLastUpdated();
            base.$el.find(".site_last_update").html(moment(date).fromNow());

        },
        registerEvents: function () {
            var base = this;
        }
    });

    return View;
});