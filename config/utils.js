var path = require('path');

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir);
}
