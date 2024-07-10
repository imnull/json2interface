const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PORT = 3001

module.exports = (options) => {
    const { WEBPACK_SERVE } = options

    const babelEsRule = {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-typescript',
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: [
                // ['@babel/plugin-transform-react-jsx', { pragma: 'React' }],
                // '@babel/plugin-transform-runtime',
                // '@babel/plugin-transform-regenerator',
                // '@babel/plugin-transform-modules-commonjs',
            ],
        }
    }

    const esbuildRule = {
        loader: 'esbuild-loader',
    }

    const esRule = WEBPACK_SERVE ? esbuildRule : babelEsRule

    return {
        mode: WEBPACK_SERVE ? 'development' : 'production',
        entry: './src/index.tsx',
        output: {
            path: path.resolve('dist'),
            library: {
                type: 'window',
                name: '$fpc',
            }
        },
        target: ['web', 'es5'],
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        // MiniCssExtractPlugin.loader,
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.[jt]sx?$/,
                    use: esRule
                }
            ]
        },
        plugins: [
            // new MiniCssExtractPlugin({
            //     filename: '[name].css',
            //     chunkFilename: '[id].css',
            // }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: '',
                filename: 'index.html',
                template: path.resolve('template.html'),
                inject: 'body',
                hash: true,
            }),
        ],
        optimization: {
            // minimize: false,
        },
        devServer: {
            port: PORT,
            hot: true,
            open: true,
            allowedHosts: [
                'devpre.cnsuning.com'
            ],
            open: true,
            liveReload: true,
        }
    }
}