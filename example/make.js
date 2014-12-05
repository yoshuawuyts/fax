var browserify = require('browserify');
var koaify = require('koaify');
var es6ify = require('es6ify');
var fs = require('fs');

koaify();

browserify()
  .add(es6ify.runtime)
  .transform(es6ify)
  .require(require.resolve('./index.js'), { entry: true })
  .bundle()
  .pipe(fs.createWriteStream('./build/bundle.js'));
