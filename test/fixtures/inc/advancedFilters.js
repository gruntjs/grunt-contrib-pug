var pugfilters = module.exports = {};

pugfilters.Nested = function(block) {
  return '{Nested}' + this.pug.render(block, this.data) + '{/Nested}';
};

pugfilters.Fiters = function(block) {
  return '{Fiters}' + this.pug.render(block, this.data) + '{/Fiters}';
};

pugfilters.Are = function(block) {
  return '{Are}' + this.pug.render(block, this.data) + '{/Are}';
};

pugfilters.Working = function(block) {
  return '{Working}' + this.pug.render(block, this.data) + '{/Working}';
};
