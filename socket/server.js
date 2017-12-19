
/*
* http 服务 websocket 配合使用
* http 响应一面和样式
* websocket 用来收发消息
* */
let express=require('express');
let app=express();
let path=require('path');
let Message=require('./model').Message;
app.use(express.static(path.join(__dirname,'public')));//把public设置为静态文件根目录

app.get('/',function(req,res){
    res.sendFile(path.resolve('./index.html'))
})
//创建一个http服务器
var server=require('http').createServer(app);
//得到一个IO实例
var io = require('socket.io')(server);
//监听客户端的链接
//  socket是连接对象 ， 可以接受消息和发送消息
//当客户端连接上的时候，会为每个客户端创建一个socket对象，通过次对象保持与每个客户端的链接，收发消息
//保存所有的用户名和socket对象的对应关系
var sockets={};
io.on('connection',function(socket){
    let username;//缓存用户名，每个客户端都有一个
    let currentRoom;

    socket.on('message',function(msg){//服务器监听客户端发来的消息
        if(username){
            var regex=/^@([^ ]+) (.+)/;
            var result=msg.match(regex);
            if(result){//匹配上私聊
                var toUser=result[1];//取得私聊的用户名
                var content=result[2];//取得私聊的内容
                sockets[toUser]&&sockets[toUser].send({
                    username,
                    content,
                    createAt:new Date().toLocaleString()
                })


            }else{

                //如果用户名存在，把此用户的消息广播给客户端
                let message = {
                    username,
                    content:msg,
                    createAt:new Date().toLocaleString()
                };
                Message.create(message,function (err,message) {
                    if(currentRoom){
                        //向某个房间广播
                        io.in(currentRoom).emit('message',message);
                    }else{
                        //把包含_id的保存后的消息对象广播给所有客户端
                        io.emit('message',message);//向所有客户端广播
                    }


                });
            }


        }else{
            //把用户的第一次消息作为用户名
            username = msg;
            //让用户名和socket对象建立关联
            sockets[username]=socket;
            //服务器进行广播，用户名为系统，内容，消息的发布时间
            io.emit('message',{username:'系统',content:`欢迎${username}加入聊天室`,createAt:new Date().toLocaleString()});
        }
    })
    socket.on('getAllMessages',function(){
        //查询所有数据，按创建时间倒序排列，取前10条
        Message.find().sort({createAt:-1}).limit(10).exec(function(err,messages){
            messages.reverse();//再对数组进行倒序排列
            //向此请求的某个客户端发回消息数组
            socket.emit('allMessages',messages);
            socket.send({username:'系统',content:'请输入用户名',createAt:new Date().toLocaleString()});


        })
    })
    socket.on('join',function(roomName){
        //如果currentRoom 有值，则说明客户端已加入某个房间
        if(currentRoom){
            socket.leave(currentRoom);//离开老房间
        }
        socket.join(roomName);//加入新房间
        currentRoom=roomName;//让新房间赋给当前房间

    });
  /*  socket.on('disconnect',function(){
        delete sockets[username];
    })*/
  socket.on('delete',function(id){
      Message.remove({_id:id},function(err,result){
          io.emit('deleted',id);
      })
  })

})
server.listen(8080);