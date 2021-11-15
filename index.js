const express = require("express");
const app = express();
const http = require("http");
const host = "localhost";
const server = http.createServer(app);
const path = require("path");
const { Server } = require("socket.io");
const io = new Server(server);
let uname1, psw1;
let list_uname = [];
let user_list = [];
let num_user = 1;
//num_user represents the number the next valid sign up user will get
let yon;
let error;
let empty;
let user;
function e(){
  list_uname.splice(-1, 1);
  user_list.splice(-1, 1);
  eval(`user${num_user} = undefined`);
  num_user--;
}

function check(){
  for(let x = 1;x<list_uname.length || x === list_uname.length;x++){
    if (list_uname[x] === uname1){
      e();
    }
  }
}

app.get("/", function(req, res){
  app.use(express.static("public"));
  res.sendFile(path.join(__dirname + "/public", "/main.html"));
});

app.get("/login", function(req, res){
  app.use(express.static("public"));
  res.sendFile(path.join(__dirname + "/public", "/login.html"))
})

app.get("/signup", function(req, res){
  app.use(express.static("public"));
  res.sendFile(path.join(__dirname + "/public", "/signup.html"))
})

io.on("connection", (socket)=>{
  socket.on("user", function(stuff){
    io.user("user", "A user has connected");
  });
  socket.on("disconnect", function(stuff){
    io.emit("user", "A user has disconnected");
  })
  socket.on("createU", (uname) => {
    uname1 = uname;
    io.emit("resend2");
  })
  socket.on("createP", (psw) => {
    psw1 = psw;
    eval(`var user${num_user} = { ${uname1}: "${psw1}" };`);
    list_uname.push(uname1);
    user_list.push(eval(`user${num_user}`));
    check();
    num_user++;
    console.log(num_user);
  })
});
server.listen(3000, host, () => {
  console.log(`Running on http://${host}:3000`);
})
