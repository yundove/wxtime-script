# wxtime-geekbang-video-recorder
极客时间企业培训视频录制，基于 OBS 和 selenium

## 使用说明

### 运行环境准备

#### 屏幕录制，依赖 OBS 环境
1. [OBS Studio](https://github.com/obsproject/obs-studio)，需要安装 27 以上版本
2. [obs-websocket](https://github.com/obsproject/obs-websocket)

#### 自动化操作，依赖 selenium-driver
1. [在这里选择浏览器驱动下载](https://www.selenium.dev/zh-cn/documentation/webdriver/getting_started/install_drivers/)

![图片](https://user-images.githubusercontent.com/77133362/155828327-26cc1dfa-9459-482c-a245-0f812bdeaaa1.png)

2. 参照配置文档进行驱动关联。建议使用[环境变量配置方式](https://www.selenium.dev/zh-cn/documentation/webdriver/getting_started/install_drivers/#2-path-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)，简单方便

#### 运行程序，依赖 Node.js 和 pnpm 管理器

1. 在本机安装 Node.js。**安装 16.x 版本以上**。推荐使用 [nvm-windows](https://github.com/coreybutler/nvm-windows) 管理 Node.js
2. 启用 pnpm。执行 corepack enable
3. 安装依赖。执行 pnpm install 

### 配置录屏软件
1. 安装 obs-websocket 插件。将插件对应内容复制到 obs 软件目录下即可
2. 运行 obs，配置场景和来源，选择要抓取的窗口

### 运行脚本
1. 修改课程地址，请查看 main.mjs 文件中的注释以配置
2. 打开 obs
3. 执行 node main.mjs 

> 注意：你必须购买了这门课程，才能开始录制。

## 开发文档参考
[selenium api](https://www.selenium.dev/selenium/docs/api/javascript/)
