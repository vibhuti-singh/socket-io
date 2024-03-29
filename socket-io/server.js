const app =
require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path')
const PORT = 3432
app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});
 users =[];
 io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('setUsername', function(data){
       console.log(data);
       if(users.indexOf(data) > -1){
          socket.emit('userExists', data + ' username is taken! Try some other username.');
       } else {
          users.push(data);
          socket.emit('userSet', {username: data});
       }
    });
    socket.on('msg', function(data){
       //Send message to everyone
       io.sockets.emit('newmsg', data);
    })
 });
 http.listen(PORT, function(){
    console.log(`listening on localhost:${PORT}`);
 });