const express = require('express'); 
const app = express(); 
//socket.io needs http server ; 
const http = require('http'); 
const httpServer = http.Server(app);
const io = require('socket.io')(httpServer);
//require mongoose
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const port = 3000

//showing the index.html
app.use(express.static(__dirname)) 


//using the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//connecting to mlab 
const dbUrl = 'mongodb://user:user12345@ds163013.mlab.com:63013/simple-chat-app'

//setup mongoDB model schema
const Message = mongoose.model('Message', {
  name: String,
  message: String
})

//getting data from db
app.get('/messages', (req, res)=>{
  //displaying mongoDB data 
  Message.find({},(err, messages)=>{
    if(err){
      console.log(err);
    }
      res.send(messages);
  })
})
//writing data to db
app.post("/messages", (req, res) => {
  console.log(req.body) 
  const message = new Message(req.body); 
  message.save(err => {
    if (err) 
        sendStatus(500);
    io.emit("message", req.body);
    res.sendStatus(200);
  })
});
//connect socket.io
io.on('connection', (socket)=>{
  console.log('a user connected'); 
})


//connect to mongoose
mongoose.connect(dbUrl,{ useNewUrlParser: true},(err)=>{
  if(err) throw err;
  console.log('mongo db is connected')
})

const server = httpServer.listen(port,()=>{
  console.log(`server is running on ${port}`)
}); 