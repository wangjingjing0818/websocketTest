
var Socket=require('ws');
 var socket=new Socket('ws://127.0.0.1:8080');
 socket.on('open',function(){//监听链接成功事件
     console.log('建立连接');
     socket.send('服务器你好')
 });
 socket.on('message',function(msg){//监听服务器发过来的消息
     console.log(msg)
 })