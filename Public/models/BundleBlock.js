define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var Model = Backbone.Model.extend({
        default: {
            name: '',
            description: ''
        },
        urlRoot: "/BlockStore/BundleBlocks",
        init: function () {
            var base = this;
            base.set("created", new Date());
            base.set("last_updated", new Date());
        },
        parse: function (response) {

            var tags_array = response.tags;
            var tags = new SmartBlocks.Blocks.BlockStore.Collections.Tags(tags_array);
            response.tags = tags;
            for (var k in tags.models) {
                var tag = SmartBlocks.Blocks.BlockStore.Data.tags.get(tags.models[k].get('id'));
                if (!tag) {
                    SmartBlocks.Blocks.BlockStore.Data.tags.add(tags.models[k]);
                }
            }
            console.log("PARSED BLOCK");
            return response;
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
            var base = this;
            if (base.get("last_updated")) {
                var date = new Date(base.get("last_updated").date);
            }
            return date;
        },
        getTags: function () {
            var base = this;
            return base.get('tags');
        },
        addTag: function (name) {
            var base = this;

            var tag = SmartBlocks.Blocks.BlockStore.Data.tags.find(function (tag) {
                return tag.get('name') == name;
            });

            var already_in = base.attributes.tags.find(function (tag) {
                return tag.get('name') == name;
            });
            if (!tag) {
                console.log('creating new tag');
                var tag = new SmartBlocks.Blocks.BlockStore.Models.Tag({
                    name: name
                });
            }
            if (!already_in)
                base.attributes.tags.add(tag);
        },
        removeTag: function (name) {
            var base = this;
            var tag = base.get('tags').find(function (tag) {
                return tag.get('name') == name;
            });
            if (tag) {
                base.get('tags').remove(tag);
            }
        },
        hasTag: function (tag) {
            var base = this;
            var tag = base.getTags().find(function (t) {
                return t.get('name') == tag.get('name');
            });
            return tag !== undefined;
        }
    });
    return Model;
});