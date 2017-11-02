'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/node_modules/index.tsx',
    output: {
        path: __dirname + `/build/client/`,
        filename: 'client-bundle.js',
        library: 'App'
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 20
    },
    resolve: {
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat'
        },
        extensions: [".tsx", ".ts", ".js"],
        modules: ["../../node_modules"]

    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({ // <-- key to reducing React's size
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            sourceMap: true,
            minimize: false
        }),
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
    ],
    devtool: 'source-map'
};