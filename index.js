const { Server } = require("socket.io");


const io=new Server(3000,{
  cors:true   
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("offer", ({Id,offer}) => {
    io.to(Id).emit("offer", {Id:socket.id,offer});
    console.log("an offer came there for id= ",Id);
  });

  socket.on("answer", ({Id,answer}) => {
    io.to(Id).emit("answer", answer);
    console.log("offer answered for id= ",Id);
  });

  socket.on("ice-candidate", ({Id,iceCandidate}) => {
    io.to(Id).emit("ice-candidate", {Id:socket.id,iceCandidate});
    console.log("came up ice candidate for id=",Id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });


  socket.on("joinRoom",(room)=>{
    socket.join(room);
    io.to(socket.id).emit("joinRoom");
    io.to(room).emit("newUser",{Id:socket.id});
  });

});