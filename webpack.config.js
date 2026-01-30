const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js', //точка входа в приложуху
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/', //для роутинга
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, 'public'), 
                    to: path.resolve(__dirname, 'dist'),
                    filter: (resourcePath) => {
                        if (resourcePath.endsWith('index.html')) return false;
                        return true;
                    },
                },
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: true,
        hot: true,
    },
    optimization: {
        minimize: true,
    },
};