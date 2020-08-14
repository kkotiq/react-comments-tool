let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'styles.css'
     }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: '/public/path/to/',
                      },
                    },
                    'css-loader',
                  ],
            }
        ]
    }
};

module.exports = config;