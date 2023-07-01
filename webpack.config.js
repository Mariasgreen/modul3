const mode = process.env.NODE_ENV || 'development';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const target = mode === 'development' ? 'web' : 'browserslist'
const devtool = mode === 'development' ? 'source-map':  false

module.exports = {
    mode,
    target,
    devtool ,
    devServer : {
    hot: true
    },
    entry:  './src/main.js',
    output: {
        filename: '[name][contenthash].js',
        path : path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name][contenthash].css' , 
           })
    ],
    module:{ 
        rules : [
            {
                test : /\.(sa|sc|c)ss$/i,
                use : [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test : /\.(jpg|jpeg|png|svg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test : /\.(woff2|wofff|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
       
        ]
    }
   }