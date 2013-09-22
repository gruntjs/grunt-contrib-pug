var jadefilters = module.exports = {};

jadefilters.Nested = function(block) {
	return '{Nested}'+this.jade.render(block, this.locals)+'{/Nested}';
};

jadefilters.Fiters = function(block) {
	return '{Fiters}'+this.jade.render(block, this.locals)+'{/Fiters}';
};

jadefilters.Are = function(block) {
	return '{Are}'+this.jade.render(block, this.locals)+'{/Are}';
};

jadefilters.Working = function(block) {
	return '{Working}'+this.jade.render(block, this.locals)+'{/Working}';
};