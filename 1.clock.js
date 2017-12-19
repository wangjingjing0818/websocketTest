
let express=require('express');
var app=express();
app.get('/',function(req,res){
    //res.sendFile 如果使用相对路径，那么需要制定root参数，指定相对路径时相对于那个绝对路径
    res.sendFile('./1.clock.html',{root:__dirname})
});
app.get('/clock',function(req,res){
    res.send(new Date().toLocaleString())
})
app.listen(8080);