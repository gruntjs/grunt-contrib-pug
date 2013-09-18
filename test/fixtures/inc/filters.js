var jadefilters = module.exports = {};

jadefilters.some = function(block) {
        return 'some: ' + block;
};

jadefilters.another = function(block) {
        return 'another: ' + block;
};