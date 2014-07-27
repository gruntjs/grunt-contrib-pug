exports.getNamespaceDeclaration = function(ns) {
  var output = [];
  var curPath = 'this';
  if (ns !== 'this') {
    var nsParts = ns.split('.');
    nsParts.forEach(function(curPart, index) {
      if (curPart !== 'this') {
        curPath += '[' + JSON.stringify(curPart) + ']';
        output.push(curPath + ' = ' + curPath + ' || {};');
      }
    });
  }

  return {
    namespace: curPath,
    declaration: output.join('\n')
  };
};