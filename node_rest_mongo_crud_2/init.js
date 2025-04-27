const mongoose = require('mongoose')
const Chat = require('./models/Chat.js')
//database connection
main().then( () => console.log("connected succesfully")).catch(err => console.log(err))

async function main(){
  await  mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
   { 
        from:"radh ",
        to:"krishna ",
        msg:"kisna why people are so find of you",
        created_at:new Date()
      },
      { 
        from:"india ",
        to:"pakistan",
        msg:"fuck you ",
        created_at:new Date()
      },   { 
        from:"iter ",
        to:"student ",
        msg:"if u have low attendance you wi not allowed to dsaet in exam",
        created_at:new Date()
      },   { 
        from:"raghika ",
        to:"anant",
        msg:"go to gym today",
        created_at:new Date()
      },   { 
        from:"raksi",
        to:"anurag",
        msg:"you bloody foolish man",
        created_at:new Date()
      },   { 
        from:"rahul",
        to:"romeo",
        msg:"chal; ghumne chale",
        created_at:new Date()
      },
      
];

Chat.insertMany(allChats).then(res => console.log(res)).catch(err => console.log(err))