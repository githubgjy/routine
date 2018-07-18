var express = require('express');
//处理post需要引入这个中间件,处理的是form-data
var formidable = require('formidable');
var fs = require('fs');
var app = express();
//处理静态资源
app.use(express.static('./'));
//处理post：form-data类型
app.post('/postformdata',function(req,res){
 var form = new formidable.IncomingForm();//输入流
 form.encoding = 'utf-8';
 form.uploadDir = 'upload/'; //设置上传目录
 form.parse(req,function(err,fields,files){//解析请求
 if (err) {
  res.send(err);
  return;
 }
 var avatarName = Date.now() + '.mp4';//以时间戳为新名字
 var newPath = form.uploadDir + avatarName;
//my_upload就是前端设置的name,将图片存储下来并重命名
 fs.renameSync(files.my_video.path, newPath);
 res.send({
  code: 200,
  path: "http://localhost:1200/"+newPath
 });
});
});
app.listen(1200);//监听端口
console.log("success")