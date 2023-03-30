const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { SquooshPlugin } = require("squoosh-webpack-plugin");

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    new SquooshPlugin({
      include: /\.(jpeg|jpg)$/,
      outDir: 'docs/assets/img/',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 0 }],
            [
              "svgo",
              {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                        addAttributesToSVGElement: {
                          params: {
                            attributes: [
                              { xmlns: "http://www.w3.org/2000/svg" },
                            ],
                          },
                        },
                      },
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
  ]
})

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig)
})
