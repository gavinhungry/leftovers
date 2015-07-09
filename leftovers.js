/**
 * leftovers - Delete everything in a directory except for specified files
 * https://github.com/gavinhungry/leftovers
 */
(function() {
  'use strict';

  var async = require('async');
  var del = require('del');
  var fs = require('fs');
  var glob = require('glob');
  var path = require('path');

  module.exports = function(base, lefts, callback) {
    lefts = lefts.map(function(left) {
      return path.join(base, left);
    });

    glob(base + path.sep + '**', {
      dot: true
    }, function(err, files) {

      async.reject(files, function(file, _callback) {
        // exact match
        if (lefts.indexOf(file) !== -1) {
          return _callback(true);
        }

        async.some(lefts, function(left, __callback) {
          fs.stat(left, function(err, stats) {
            if (err) {
              return __callback(true);
            }

            // under a specified directory
            if (stats.isDirectory() && !file.indexOf(left + path.sep)) {
              return __callback(true);
            }

            // parent directories
            var parent, last = left;

            while ((parent = path.dirname(last)) && parent !== last) {
              if (parent === file) {
                return __callback(true);
              }

              last = parent;
            }

            __callback(false);
          });
        }, _callback);
      }, function(matches) {
        del(matches, callback);
      });
    });
  };

})();
