const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Chat = require('./models/Chat.js')
const methodOverride = require('method-override');

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));


//database connection
main().then( () => console.log("connected succesfully")).catch(err => console.log(err))

async function main(){
  await  mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//all chats route
app.get('/chats', (req, res) =>{
  Chat.find().then( reso => res.render("chats.ejs",{reso})).catch(err => console.log(err))
})

app.get('/chats/new', (req, res) =>{
   res.render("newChat.ejs")
})
app.post('/chats', (req, res) =>{
let {from , to, msg} = req.body;


const newChat = new Chat({
  from,
  to,
  msg,
  created_at: new Date()
});
newChat.save().then(res => console.log("chat  saved")).catch( err => console.log(err))
res.redirect('/chats')
})

app.get('/chats/:id/edit',async (req, res) =>{ 

  let id = req.params.id;
  let chat =await Chat.findById(id);
res.render("editChat.ejs",{chat})
})

app.put('/chats/:id',async (req, res) => {
  let {id} = req.params;
  console.log(id);
  
  let {msg} = req.body;
let updatedchat = await Chat.findByIdAndUpdate(id, {msg: msg}, {runValidators: true, new:true});
console.log(updatedchat);
res.redirect('/chats')

})


app.delete('/chats/:id/delete',async (req, res) =>{

  let {id } = req.params;
  let deleted = await Chat.findByIdAndDelete(id);
  console.log(deleted);
  res.redirect('/chats')
})
const port = 3000
app.listen(port , () =>{
    console.log("Server is running on port 3000")
})