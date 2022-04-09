// @ts-check
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {ProgressPlugin} = require('webpack');

const outputDirectory = path.resolve(__dirname, './out');

/**
 * @typedef {import('webpack').Configuration} Configuration
 * @typedef {import('webpack-dev-server').Configuration} DevConfiguration
 * @typedef {(env: unknown, args: {mode: 'development' | 'production'}) => Configuration & {devServer: DevConfiguration}} ConfigurationFactory
 */

/**
 * @type ConfigurationFactory
 */
module.exports = (_env, args) => ({
    mode: args.mode,
    devtool: 'inline-source-map',
    entry: {
        app: './src/pages/Main.tsx',
    },
    output: {
        path: outputDirectory,
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },

    devServer: {
        liveReload: true,
        hot: true,
        open: true,
        static: {
            watch: true,
            directory: outputDirectory,
        },
    },

    optimization: {
        minimize: args.mode !== 'development',
        minimizer: [
            new TerserPlugin({
                exclude: /\.css$/i,
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                },
            },
            minChunks: 1,
            minSize: 30000,
            // chunks: 'async',
            name: false,
            chunks: 'all',
        },
    },

    module: {
        rules: [
            {test: /\.tsx?$/, loader: 'ts-loader'},
            {test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader']},
            {
                test: /\.(webp|jpe?g|png|svg|gif|ico)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images',
                },
            },
            {
                test: /\.(woff2?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts',
                },
            },
        ],
    },

    plugins: [
        new ProgressPlugin({percentBy: 'dependencies'}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/static/index.html'),
            chunks: ['app'],
            minify: true,
            favicon: false,
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
            experimentalUseImportModule: true,
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [{from: 'src/static/icon.png'}, {from: 'src/static/db.json'}],
        }),
    ],

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
});
