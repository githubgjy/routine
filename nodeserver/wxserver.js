var ws = require('nodejs-websocket');


//创建server
var server = ws.createServer(function(conn){
 conn.on("text",function(str){//监听文本内容输入
 if(str == "stock"){
 setInterval(function(){
  var arr = [];
  for(var i=0;i<6;i++){
   var count = (Math.ceil((Math.random()*100))/100).toFixed(2);

   arr.push(count);
  }
  var obj = {data:arr};
  conn.send(JSON.stringify(obj));
 },2000);

 }
});
}).listen(8000);
console.log("服务成功了")