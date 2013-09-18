var jadefilters = module.exports = {};

jadefilters.some = function(block) {
	return '<some>'+block+'</some>';
};

jadefilters.another = function(block) {
	return '<another>'+block+'</another>';
};