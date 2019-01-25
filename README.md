目录结构说明
========================

```bash
├── build                                       #webpack配置文件
├── config                                      #项目打包路径
├── src                                         #源码目录
        ├── assets                              #公用图片
	    ├── components                            #组件
			├── js                                    #JS文件。  
			  |__admin                                #后台JS文件     
				|__front                                #前台JS文件 
				|__plugins                              #JS插件
		       |——PageSwitch                        #全屏滚动插件  
		       |——Swiper                            #焦点图插件 
		       |——ueditor-1.4.4.4                   #文本编辑器
				|__util                                 #共用JS方法                                  
		├── css                                     #样式文件
				|__admin                                #后台CSS  
				|__front                                #前台CSS
				|__common.css                           #共用CSS
		├── fonts                                   #字体图标页面
		     |__common                              #共用文件
		         |__Footer.vue                      #页头
		         |__Footer.vue                      #页脚
		     |__Index.vue                           #前台首页 
		├── admin                                   #后台前台页面
		      |__common                             #共用文件
		         |__Main.vue                        #主框架结构
		      |__Login.vue                          #后台登录页 
		      |__Index.vue                          #后台首页 
		      |__column                             #栏目管理   
		      |__database                           #数据库管理
		      |__news                               #文章管理
		├── customer                                #移动用户端页面
		      |__Index.vue                          #移动首页 
		├── router                                  #路由
	  ├── App.vue                                 #页面入口文件
   	├──main.js                                  #程序入口文件，加载各种公共组件
├── static                                      #静态资源
     ├──img                                     #图片文件。  
     |__css                                     #样式图片    
     |__updata                                  #上传图片地址  注：后台要按功能建目录-并按时间建文件添加在功能目录文件里。    
     |__measurement                             #测试图片地址   注：止文件为测试图片 可以删除
├── .babelrc                                    #ES6语法编译配置
├── .editorconfig                               #代码编写规格
├── .gitignore                                  #忽略的文件
├── index.html                                  #入口html文件
├── package.json                               #项目及工具的依赖配置文件
├── README.md                                   #说明
```

## 示例

      基于Vue.js 2.x系列 + Element UI+ mint-ui-2.0 的前端系统解决方案。
   
## 依赖环境

       需安装Node.js
 
## 安装步骤 

	1. git clone https://github.com/zrobiao/vue-All.git  //把模板下载到本地
	2. cd manage-system    // 进入模板目录
	3. npm install --registry=https://registry.npm.taobao.org (npm install -g cnpm --registry=https://registry.npm.taobao.org) 
	4. npm install   // 安装项目依赖，等待安装完成之后; 


## 本地开发

        开启服务器，浏览器访问 http://localhost:8080
    npm run dev

## 构建生产

        执行构建命令，生成的dist文件夹放在服务器下即可访问
    npm run build
