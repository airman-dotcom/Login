var socket = io();
let uname;
let psw;
let a, b;
function submit(){
  uname = document.getElementById("uname").value;
  psw = document.getElementById("psw").value;
  console.log(uname + ", " + psw)
  socket.emit("createU", uname);
}

socket.on("resend", () => {
    uname = document.getElementById("uname").value;
    psw = document.getElementById("psw").value;
    socket.emit("createU", uname);
})
socket.on("b", (uname1, psw1) => {
  a = uname1;
  b = psw1;
  alert(a);
  alert(b);
})

socket.on("c", (obj) => {
  let obj1 = obj;
  console.log(obj);
})

socket.on("resend2", () => {
  socket.emit("createP", psw);
})

socket.on("test", (obj2) => {
    alert(obj2);
    console.log(obj2)
})

socket.on("error", (info) => {
  console.log(a);
});

socket.on("su_error", () => {
  alert("This username is not available, and has already been taken");
  document.getElementById("uname").value = "";
  document.getElementById("psw").value = "";
})