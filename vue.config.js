// const path = require('path');
// const PrerenderSpaPlugin = require('prerender-spa-plugin');

// const productionPlugins = [
//   new PrerenderSpaPlugin({
//     staticDir: path.join(__dirname, 'dist'),
//     routes: [
//       '/support',
//       '/return-policy',
//       '/terms-and-conditions',
//       '/privacy-policy'
//     ]
//   })
// ];

module.exports = {
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.plugins.push(...productionPlugins);
  //   }
  // },
  chainWebpack: (config) => {
    config.module.rule('js').exclude.add(/\.worker\.js$/);
    config.output.globalObject('self');
  },
  pwa: {
    workboxOptions: {
      cleanupOutdatedCaches: true
    }
  },
  productionSourceMap: false
};
