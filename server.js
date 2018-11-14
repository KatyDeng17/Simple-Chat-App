const express = require('express'); 
const app = express(); 
//socket.io needs http server ; 
const http = require('http'); 
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer)

const bodyParser = require('body-parser');
const port = 3000

//showing the index.html
app.use(express.static(__dirname)) 


//using the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const messages = [
  { name: "katy", message: "hi" },
  { name: "james", message: "hello" }
];

app.get('/messages', (req, res)=>{
  res.send(messages);
})

app.post("/messages", (req, res) => {
 
  messages.push(req.body);
  console.log(messages);
  io.emit('message', req.body)
  res.sendStatus(200)
});
//connect socket.io
io.on('connection', (socket)=>{
  console.log('a user connected'); 
})

const server = httpServer.listen(port,()=>{
  console.log(`server is running on ${port}`)
}); 