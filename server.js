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

//setup Promise
mongoose.Promise = Promise; 

//connecting to mlab 
const dbUrl = 'mongodb://user:user12345@ds163013.mlab.com:63013/simple-chat-app'

//setup mongoDB model schema
const Message = mongoose.model('Message', {
  name: String,
  message: String
})

//getting data from db
app.get('/messages', async (req, res)=>{
  try{
    //displaying mongoDB data .fine({}): return all the data 
      const findMessage = await Message.find({})
      res.send(findMessage);
  }catch(error){
     console.log(error);
  }
        //  .then(message=>{
        //    res.send(message)
        //  })
        //  .catch(err=>{
        //    console.log(err);
        //  })
})
//writing data to db
app.post("/messages", async (req, res) => {
  const userInputData = req.body;
  const message = new Message(userInputData); 
 
  try{

    const savedMessage = await message.save();
    console.log("user input saved into DB");

    const badword = await Message.findOne({ message: "f*ck" });

    if (badword) {
      console.log("bad word found", badword);
      await Message.remove({ _id: badword.id });
    } else {
      io.emit("message", userInputData); //real time update
      res.sendStatus(200);
    }   

  }catch(error){
      res.sendStatus(500);
      return console.error(error)
  }
  
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