leftovers
=========
Delete everything in a directory except for specified files.

Installation
------------

    npm install leftovers

Usage
-----

```javascript
var leftovers = require('leftovers');

leftovers('path/to/files', [
  'foo/bar/baz.js',
  'my/dir'
], callback); // (err, paths)
```

Everything in `path/to/files` will be deleted, except:

  * `foo/`
  * `foo/bar`
  * `foo/bar/baz.js`
  * `my/dir/`

License
-------
Released under the terms of the
[MIT license](http://tldrlegal.com/license/mit-license). See **LICENSE**.
