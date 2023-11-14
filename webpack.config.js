const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
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

}