// path.resolve([from ...], to) 将to参数解析为绝对路径
const path=require('path');

// 一个用于删除/清理构建文件夹的webpack插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 一个简化HTML文件的创建来为你的webpack bundle提供服务的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports={
    optimization:{
        minimize:false,// 关闭代码压缩
    },

    // 入口起点指示webpack应该使用哪个模块来作为构建内部依赖图的开始
    entry:"./src/index.ts",

    // 告诉webpack在哪里输出它所创建的bundle以及如何命名这些文件
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"bundle.js",
    },

    // 告知webpack使用相应模式的内置优化
    mode:"development",

    // SourceMap一个信息文件，里面储存着位置信息，转换后的代码的每个位置对应转换前的位置
    devtool:"inline-source-map",

    // 构建本地服务
    devServer:{
        static:{
            directory:path.join(__dirname,'dist'),
        },
        compress:true,// gzip压缩
        port:9000,// 指定监听请求的端口号
        hot:true,// 模块热替换
    },

    // 配置模块如何解析
    resolve:{
        extensions:[".ts",".js"],// 尝试按顺序解析这些后缀名
    },

    // 配置loader
    module:{
        rules:[
            {
                test:/\.ts$/,
                use:[// 加载顺序:从后到前
                    {
                        loader:"babel-loader",
                        // 设置babel
                        options:{// 设置预定义的环境
                            presets:[
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        "targets":{
                                            "ie":"11",
                                        },
                                        // core.js的版本
                                        "corejs":"3",
                                        // 使用core.js的方式
                                        // usage:按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        },
                    },
                    {loader:"ts-loader"},
                ],
                exclude:/node_module/,
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    ["postcss-preset-env",{browsers:'last 2 version'}]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ]
            }
        ]
    },

    // 配置plugin
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
        }),
    ]
}
/* 
yarn init
yarn add webpack webpack-cli webpack-dev-server typescript ts-loader html-webpack-plugin clean-webpack-plugin -D
yarn add @babel/core @babel/preset-env babel-loader core-js -D
yarn add style-loader css-loader postcss  postcss-loader postcss-preset-env less less-loader -D */