define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default: {
            name: '',
            description : ''
        },
        urlRoot: "/BlockStore/Bundleblocks",
        init: function () {
            base.set("created", new Date());
            base.set("last_updated", new Date());
        },
        getCreator: function () {
            var base = this;
            var user = SmartBlocks.Blocks.Kernel.Data.users.get(base.get("creator").id);
            return user;
        },
        getCreated: function () {
            var base = this;
            if (base.get("created")) {
                var date = new Date(base.get("created").date);
            }
            return date;
        },
        getLastUpdated: function () {
            var base = this
            if (base.get("last_updated")) {
                var date = new Date(base.get("last_updated").date);
            }
            return date;
        }
    });
    return Model;
});