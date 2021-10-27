# 接口文档

## 使用方式
在vue文件中使用 this.$getData.(‘相对应函数’)调用接口，返回promise形式函数

在js文件中import {getData} 引入api实例来调用接口，方式和vue文件中一致

## 接口列表


### common.js
* uploadFile    上传图片
* getSMSCode    发送验证码

### login.js
* login  登录
* register  注册坐席
* isLogin   检查是否登录

### chat.js
* getCarSeries 获取车系信息

### socket.js
  messageType 
    text("text","文字"),
	image("image","图片"),
	voice("voice","语音"),
	video("video","视频"),
	
	link("link","链接"),
	file("file","文件"),
	notice("notice","通知"),
	allocagent("allocagent","分配新坐席"),
	offline("offline","下线");
* onConnect    连接socket

### workorder.js
* workorderList    工单列表


