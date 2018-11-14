const socket = io();

     $(()=>{
       console.log("loaded")
       $('#send').click(()=>{
          // addMessage({ name: 'Katy', message: 'hello' })
          const data = { name: $("#name").val(), message: $('#message').val()}
          postMessage(data)
       })
       getMessage()
      
     }); 
  
     const addMessage = (data)=>{
       $("#messagesArea").append(`
       <h4> ${data.name} </h4>
       <p> ${data.message}</p>
       `)
     };

     const getMessage=()=>{
        $.get('http://localhost:3000/messages',(data)=>{
          console.log(data)
          data.forEach(addMessage
          //   element => {
          //   addMessage(element)
            
          // }
        );
        })
     }
      const postMessage = (message) => {
        $.post('http://localhost:3000/messages',message)
      }
      socket.on('message', addMessage)
