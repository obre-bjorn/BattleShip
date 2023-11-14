const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
    
        mode: 'development',
        entry: './src/index.js',
        devtool: 'inline-source-map',
        devServer: {
           static:'./dist',
        },
        plugins:[
        new ESLintPlugin()
        ],
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }}
        ]
    },
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname,'dist')
    }

}