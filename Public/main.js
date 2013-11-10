define([
    'jquery',
    'underscore',
    'backbone',
    './apps/blocks_explorer/views/main'
], function ($, _, Backbone, BlocksExplorerView) {
    var main = {
        init: function () {

        },
        launchBlocksExplorer: function (app) {
            var blocks_explorer = new BlocksExplorerView();
            SmartBlocks.Methods.render(blocks_explorer.$el);
            blocks_explorer.init(app);

            app.initRoutes({
                "": function () {

                    blocks_explorer.showExplorer();
                },
                "show/:id": function (id) {
                    var block = SmartBlocks.Blocks.BlockStore.Data.bundle_blocks.get(id);

                    if (block) {
                        blocks_explorer.showBlock(block);
                    } else {
                        window.location = "#BlocksExplorer";
                    }
                }
            });

        }
    };

    return main;
});