define([
    'jquery',
    'underscore',
    'backbone',
    './apps/blocks_explorer/views/blocks_explorer'
], function ($, _, Backbone, BlocksExplorerView) {
    var main = {
        init: function () {

        },
        launchBlocksExplorer: function (app) {
            var blocks_explorer = new BlocksExplorerView();
            SmartBlocks.Methods.render(blocks_explorer.$el);
            blocks_explorer.init(app);
        }
    };

    return main;
});