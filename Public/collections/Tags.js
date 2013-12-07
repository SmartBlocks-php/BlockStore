define([
    'jquery',
    'underscore',
    'backbone',
    '../models/Tag'
], function ($, _, Backbone, Tag) {
    var Collection = Backbone.Collection.extend({
        model: Tag,
        url: "/BlockStore/Tags"
    });

    return Collection;
});