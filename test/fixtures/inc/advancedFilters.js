var jadefilters = module.exports = {};

jadefilters.Nested = function(block) {
  return '{Nested}' + this.jade.render(block, this.data) + '{/Nested}';
};

jadefilters.Fiters = function(block) {
  return '{Fiters}' + this.jade.render(block, this.data) + '{/Fiters}';
};

jadefilters.Are = function(block) {
  return '{Are}' + this.jade.render(block, this.data) + '{/Are}';
};

jadefilters.Working = function(block) {
  return '{Working}' + this.jade.render(block, this.data) + '{/Working}';
};