let path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let webpackConfig = {
    entry: {
        myCustomViz: './src/visualizations/my-custom-viz.ts'
    },
    output: {
        // filename: '[name].js',
        filename: 'details.js',
        path: path.join(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    plugins: [
        new UglifyJSPlugin()
    ],
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.css$/, use: [ 'to-string-loader', 'css-loader' ] },
            { test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    devServer: {
        // contentBase: false,
        compress: true,
        port: 3443,
        https: true
    },
    devtool: 'eval',
    watch: true,
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};

module.exports = webpackConfig;