/**
 * Created by Administrator on 2017/3/25.
 */
let mongoose=require('mongoose');
mongoose.Promise=Promise;
mongoose.connect('mongodb://127.0.0.1/201614chat');//链接数据库
//定义模型骨架
let MessageSchema=new mongoose.Schema({
    username:String,
    content:String,
    createAt:{type:Date,default:Date.now}
})
//定义并导出模型
exports.Message=mongoose.model('Message',MessageSchema);
