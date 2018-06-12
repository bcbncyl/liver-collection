/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-05-20 13:48:08 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-12 11:37:26
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackOnBuildPlugin = require('on-build-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const buildPath = __dirname + '/dist/';

let plugins = [
    new HtmlWebpackPlugin({ // 生成html
        template: './src/index.html',
        chunks: ['popup'],
        hash: true,
        minify: {
            minifyJS: true,
            minifyCSS: true,
            removeComments: true,
            collapseWhitespace: true,
        }
    }),
    new CopyWebpackPlugin([
        {
            from: __dirname + '/src/assets',
            to: __dirname + '/dist/assets'
        },
        {
            from: __dirname + '/manifest.json',
            to: __dirname + '/dist'
        },
        {
            from: __dirname + '/contentScript/css',
            to: __dirname + '/dist/assets/contentScript'
        }
    ]),
];

module.exports = {
    devServer: {
        port: 9099
    },
    stats: {
        // assets: false,
        // entrypoints: false,
        // modules: false,
        // warnings: false
    },
    devtool: 'source-map',
    entry: {
        popup: __dirname + '/src',
        // contentScript: __dirname + '/contentScript',
        // background: __dirname + '/background'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].[chunkHash:8].js',
        chunkFilename: 'vendor/[name].[chunkHash:8].js'
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // MiniCssExtractPlugin.loader,
            }
        ]
    }
};