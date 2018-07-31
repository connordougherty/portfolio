const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');

const { ImageminWebpackPlugin } = require('imagemin-webpack');
const ImageminGifsicle = require("imagemin-gifsicle");
const ImageminJpegtran = require("imagemin-jpegtran");
const ImageminOptipng = require("imagemin-optipng");
const ImageminSvgo = require("imagemin-svgo");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");


module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new UglifyJsPlugin()
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin (['dist']),
        new FaviconWebpackPlugin ('./src/images/logo.png'),
        new MiniCssExtractPlugin ({
            filename: 'styles.css'
        }),
        new HtmlCriticalWebpackPlugin ({
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
                blockJSRequests: false,
            }
        }),
        new ImageminWebpackPlugin ({
            imageminOptions: {
                plugins: [
                    ImageminGifsicle({
                        interlaced: true
                    }),
                    ImageminJpegtran({
                        progressive: true
                    }),
                    ImageminOptipng({
                        optimizationLevel: 5
                    }),
                    ImageminSvgo({
                        removeViewBox: true
                    })
                ]
            }
        })
    ]
});