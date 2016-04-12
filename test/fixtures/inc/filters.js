var pugfilters = module.exports = {};

pugfilters.some = function(block) {
  return 'some: ' + block;
};

pugfilters.another = function(block) {
  return 'another: ' + block;
};