var websock = null;
var clientId = '';
var client_callback = null,
newMsg_callback = null,
navbarStatus_callback = null,
notice_callback = null,
sendMsg_callback = null,
close_callback = null;   
import { socketIp,localKey,socketPort,projectKey } from '../config/ip-config'
import { getData } from '../index'
import router from '@/router'
//初始化weosocket
function initWebSocket(clientId){  
  //判断正式还是测试


console.log(router.app.$route)
     clientId = clientId + `_` + router.app.$route.query.tenant;
 
    // clientId = clientId;

    // console.log(socketIp+'ww'+ socketPort+'ww'+clientId+'ww'+projectKey);
    console.log(socketIp, socketPort, clientId)
    websock = new Paho.MQTT.Client(socketIp, socketPort, ''+clientId); 

    var options = {
        timeout: 5,
        mqttVersion:4,           
        keepAliveInterval: 5,
        cleanSession: true,        //false  
        useSSL: window.location.protocol.indexOf('https') > -1? true : false, //Mall柳州打开，其他影藏
        userName: clientId,  //sale_1  
        password: 'user123456', 
        onSuccess: function(e){
          onConnect(e)
        },
        onFailure: function (e) {  
        //   console.log(e);
        //   s = "{time:" + new Date().Format("yyyy-MM-dd hh:mm:ss") + ", onFailure()}";
          console.log("onFailure:",e);
          // onConnectionLost(e);
        }
    };
    websock.connect(options);                 // 连接服务器并注册连接成功处理事件
    websock.onConnectionLost = function(e){   // 注册连接断开处理事件
        console.log('连接断开',e);
        // onConnectionLost(e);
        notice_callback(e)
    }
    websock.onMessageArrived = function(e){   // 注册消息接收处理事件
    	onMessageArrived(e);
    } 
    
    //连接发生错误的回调方法
	// websock.onerror = function () {
	// 	console.log("WebSocket连接发生错误");
	// }
}
 
// 实际调用的方法
function sendSock(sendData,toUser,callback){  
    // sendMsg_callback = callback;
    // websocketsend(sendData,toUser)

    var message = new Paho.MQTT.Message(sendData);  
    // message.destinationName = "/root/"+toUser;
    // message.destinationName = `/root/one2one/chat/`+toUser+`_${localStorage.getItem('tenant')}`;
    // message.destinationName = `/root/one2one/chat/`+toUser+`_guangfeng`;
    message.destinationName = toUser;
    message.retained = true;
    // console.log(message);
    websock.send(message);
    callback(JSON.parse(sendData));


    // if (websock.readyState === websock.OPEN) {
    // 	//若是ws开启状态
    //     websocketsend(sendData)
    // }else if (websock.readyState === websock.CONNECTING) {
    // 	// 若是 正在开启状态，则等待1s后重新调用
    //     setTimeout(function () {
    //     	sendSock(sendData,callback);
    //     }, 1000);
    // }else {
    // 	// 若未开启 ，则等待1s后重新调用
    //     setTimeout(function () {
    //         sendSock(sendData,callback);
    //     }, 1000);
    // }
}

//连接成功
function onConnect(e){
    console.log("连接成功onConnected",e);
 
    myApp.$store.dispatch('setSocketStatus',1);

    // websock.subscribe('/root/chat/one2one/admin_agent_test11',{   // 订阅主题     topicId
    //   invocationContext: {},
    //   onSuccess:(e)=>{
    //     console.log('订阅article成功++',e);
    //     // console.log('/root/article/'+topicId+userId);
    //   },
    //   onFailure:(e)=>{
    //     console.log('订阅失败++',e);
    //   },
    //   timeout: 9000
    // });
}

//数据接收
function onMessageArrived(message){ 
    console.log("socket内部收到消息:+",message);  
    // /root/one2one/chat/
    // /root/one2one/event/
    if(/chat/.test(message.destinationName)){
      let obj = JSON.parse(message.payloadString);
      // console.log('消息回调data',obj);
      if(newMsg_callback){
        newMsg_callback(obj);
      }
      // if(navbarStatus_callback){
      //   navbarStatus_callback(data)
      // }
      return
      switch(data.type){
          case 'allocagent': 
            if(client_callback){
              client_callback(data)
            }
            if(navbarStatus_callback){
              navbarStatus_callback(data)
            }
            break
          case 'offline': 
            if(client_callback){
              client_callback(data)
            }
            break
          case 'online':
            if(client_callback){
              client_callback(data)   
            } 
            break
          case 'notice': 
            if(notice_callback){
              notice_callback(data)
            }
            break
          case  'statistics':
            if(navbarStatus_callback){
              navbarStatus_callback(data)
            }
            break
          case 'transfer': 
            if(client_callback){
              client_callback(data)
            }
            if(newMsg_callback){
              newMsg_callback(data)
            }
            if(navbarStatus_callback){
              navbarStatus_callback(data)
            }
            break
          default : 
            if(newMsg_callback){
              newMsg_callback(data);
            }
            if(navbarStatus_callback){
              navbarStatus_callback(data)
            }
      }
    }
    if(/event/.test(message.destinationName)){
      let obj = JSON.parse(message.payloadString);
      console.log("事件message",obj); 
      client_callback(obj);
      // if(obj.eventName=="NewSessionEvent"){    //新会话
      //   // saleChatTopic // userChatTopic
      //   console.log('新的会话');
      //   client_callback(obj);
      // }
    }
    // receive_callback(message);
}
 
//数据发送
function websocketsend(content,toTopic){
    var message = new Paho.MQTT.Message(content);   
    // message.destinationName = "/root/chat/one2one/"+toUser;
    message.destinationName = toTopic;
    message.retained = true;
    console.log(message);
    
    websock.send(message);
    sendMsg_callback(JSON.parse(content));
}
 
//连接断开状态
function onConnectionLost(responseObject) {
    console.log("onConnectionLost----->",responseObject);
    myApp.$store.dispatch('setSocketStatus',2)
    if (responseObject.errorCode == 0) {
        console.log('自己手动退出:' + responseObject);
  
    }
    // else if(responseObject.errorCode == 8){
    //   // console.log('被挤下线',responseObject);
    //   // myApp.openMessage(0, "抱歉您的账号在其他地方登录，您被迫下线");
    //   close_callback(responseObject);
    //   myApp.$store.dispatch('setSocketStatus',2)
    // }
    // else if(responseObject.errorCode == 4){  //断网消息
    //   close_callback(responseObject)
    //   myApp.$store.dispatch('setSocketStatus',2)
    //   myApp.$store.dispatch('initSocket') 
    // }
    else{
        if(close_callback){
            close_callback(responseObject)
        }else{
            setTimeout(()=>{
                close_callback(responseObject)
            },2000)
        }

    }
    console.log('只要断线就打印++++++++',responseObject);
}

//断开连接
function onDisconnect(){
    websock.disconnect()
}

function set_callback (type,cb){
    switch (type){
        case  'client' :
            client_callback  = cb
            break
        case  'newMsg' :
            newMsg_callback  = cb
            break
        case  'statistics' :
            navbarStatus_callback  = cb
            break
        case  'notice' :
            notice_callback  = cb
            break
        case  'close' :
            close_callback  = cb
            break
        default: ;   
    }
}

 
// initWebSocket('agent_81c87c6595204a7689a921411c50d4c7');
 
export {
  initWebSocket,
  sendSock,
  onMessageArrived,
  set_callback,
  onDisconnect
}