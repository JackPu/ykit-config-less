# ykit-config-less

[ykit](https://ykit.ymfe.org/getting-started.html) plugin for LESS loader.

## Get Statrted

``` bash
$ npm install ykit-config-less --save-dev
```

And add plugin in `ykit.js`

``` js
var path = require('path')
// var basePath = path.join(__dirname, 'static');
module.exports = {
  plugins: ['less'], // add your plugin
  config: {
    exports: [
      './styles/index.less'
    ],
    modifyWebpackConfig: function (baseConfig) {
      // edit ykit's Webpack configs
      return baseConfig
    }
  },
  hooks: {},
  commands: []
};
```

## MIT LICENSE




