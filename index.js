module.exports = {
  config: function (options) {
    const self = this
    var extractOption = options.extract || 'always'

    return {
      modifyWebpackConfig: function (baseConfig) {
        let isExists = false
        const loaderObj = {
          test: /\.less$/,
          loader: hadnleExtractLoaders([
            'css-loader',
            'less-loader'
          ])
        }

        baseConfig.module.loaders = baseConfig.module.loaders
            .map(function (loader) {
              if (loader.test.toString().match(/less/)) {
                isExists = true
                return loaderObj
              }
              return loader
            })

        if (!isExists) {
          baseConfig.module.loaders.push(loaderObj)
        }

        baseConfig.resolve.extensions.push('.less')
        baseConfig.entryExtNames.css.push('.less')

        return baseConfig
      }
    }

    function hadnleExtractLoaders (loaders) {
      const loaderString = loaders.map(function (loader) {
        return require.resolve(loader) + (self.env === 'prd' ? '' : '?sourceMap')
      }).join('!')

      const extract = options.ExtractTextPlugin.extract(
          self.webpack.version && self.webpack.version >= 2
          ? require.resolve('style-loader') + '!' + loaderString
          : require.resolve('style-loader'), loaderString
      )

      var noExtract = require.resolve('style-loader') + '!' + loaderString
      switch (extractOption) {
        case 'auto':
          return self.env === 'local' ? noExtract : extract
        case 'never':
          return noExtract
        default:
          return extract
      }
    }
  }
}
