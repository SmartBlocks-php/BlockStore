define([
    'jquery',
    'underscore',
    'backbone',
    './apps/blocks_explorer/views/main',
    './apps/blocks_manager/views/main'
], function ($, _, Backbone, BlocksExplorerView, BlocksManagerView) {
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

        },
        launchBlocksManager: function (app) {
            var blocks_manager = new BlocksManagerView();
            SmartBlocks.Methods.render(blocks_manager.$el);
            blocks_manager.init(app);

            app.initRoutes({
                "": function () {
                    blocks_manager.showDashboard();
                },
                "my_blocks": function () {
                    blocks_manager.showMyBlocks();
                },
                "new": function () {
                    blocks_manager.showCreateBlock();
                },
                "edit/:id": function (id) {
                    var block = SmartBlocks.Blocks.BlockStore.Data.bundle_blocks.get(id);
                    if (block) {
                        blocks_manager.showEdition(block);
                    }
                }
            });
        }
    };

    return main;
});