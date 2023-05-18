//IMPORTS
const express =  require('express')
const app = express()

//
const http = require('http');
const server = require('http').Server(app);

const defURL = "http://localhost:3000"

//STATIC FILES:
app.use(express.static('public'));
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/js',express.static(__dirname + 'public/js'));

//ADD:
app.use('/img', express.static(__dirname + 'public/img'));

// SET THE VIEW ENGINE TO EJS
app.set('views', './views');
app.set('view engine', 'ejs');

//USE RES.RENDER TO LOAD UP AN EJS VIEW FILES
//app.get('',(req,res) => {
//   res.render('chat',{socketURL:defURL});
//  });

app.get('',(req,res) => {
  res.render('login')
})

// MESSAGE EJS : LOG IN PAGE
app.get('/login', function(req, res) {
  res.render('login');
});

// CHATAPP EJS : CHAT APP PAGE 
app.get('/chat',(req,res) => {
  res.render('chat',{socketURL:defURL});
});

const io = require('socket.io')(server);
io.sockets.on('connection', socket=>{
  console.log('Connected Ready')

  socket.on('sendMessage',msg =>{
       socket.broadcast.emit('sendToAll',msg)
  })

})


// SIGNUP EJS : SIGN UP PAGE
app.get('/signup', function(req, res) {
  res.render('signup');
});

server.listen(3000);
    console.log('Server is running on port 3000');
