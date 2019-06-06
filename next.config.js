if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => null;
}
const NextWorkboxPlugin = require('next-workbox-webpack-plugin');
const withCSS = require('@zeit/next-css');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
module.exports = withCSS({
  webpack(config, { isServer, buildId, dev }) {
    config.node = {
      fs: 'empty'
    };
    const workboxOptions = {
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: [
        '.next/static/*',
        '.next/static/chunks/*',
        '.next/static/css/*'
      ],
      modifyUrlPrefix: {
        '.next': '/_next'
      },
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: /[^3]\/product\//,
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: /[^3]\/search\//,
          handler: 'networkFirst',
          options: {
            cacheName: 'html-cache'
          }
        },
        {
          urlPattern: new RegExp(
            '^https://scalr.api.appbase.io/movies-store-app/_msearch'
          ),
          handler: 'staleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [200]
            }
          }
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'image-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    };
    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          ...workboxOptions
        }),
        new WebpackPwaManifest({
          filename: 'static/manifest.json',
          name: 'Movies Store',
          short_name: 'Movies Store',
          description: 'A Movie store to browse and watch movies',
          background_color: '#ffffff',
          theme_color: '#17181B',
          display: 'standalone',
          orientation: 'portrait',
          fingerprints: false,
          inject: false,
          start_url: '/',
          ios: {
            'apple-mobile-web-app-title': 'Movies Store',
            'apple-mobile-web-app-status-bar-style': '#17181B'
          },
          icons: [
            {
              src: path.resolve('static/icon.png'),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: '/static'
            }
          ],
          includeDirectory: true,
          publicPath: '..'
        })
      );
    }
    return config;
  }
});
