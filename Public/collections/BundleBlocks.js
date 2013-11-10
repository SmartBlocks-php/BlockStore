define([
    'jquery',
    'underscore',
    'backbone',
    '../models/BundleBlock'
], function ($, _, Backbone, BundleBlock) {
    var Collection = Backbone.Collection.extend({
        model: BundleBlock,
        url: "/BlockStore/BundleBlocks"
    });

    return Collection;
});