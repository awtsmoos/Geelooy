//BH

var r=require("http")
r.createServer((a,b)=>{
b.end("hi")
}).listen(process.env.PORT||80)
