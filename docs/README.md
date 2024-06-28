# 简介

将 javascript 源码转译为 dsl 的脚手架。支持多页面构建与文件动态监听。支持 web 预览，目前建议在 web 端 + 小程序端同时开启预览，这样可以方便追踪问题，因为 dsl 渲染目前不支持 source map。


## 开发建议

尽量保证代码的简洁性，一些通用性的 npm 包请考虑在小程序端通过「registerGlobalScope」挂载上去，然后改成 externals 依赖。


## 不支持的功能

1. 不要尝试加载 css，因为是面向小程序的页面。微信小程序目前不支持加载外部的 css，只在使用小程序包内的样式，或者是使用内联样式。
2. LabeledStatement 不支持。没有支持的必要，如果遇到 LabeledStatement 需要开发自行解决

