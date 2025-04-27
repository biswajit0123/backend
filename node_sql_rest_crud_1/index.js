//prefer node_sql directory for better understanding

const express = require('express')
const { faker } = require('@faker-js/faker');//get random user
const mysql = require('mysql2')
const path = require('path');
const methodOverride = require('method-override')
const app = express()
port= 3000;

//set view engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))


//for including static files
app.use(express.static(path.join(__dirname,"/public")))

//to convert post to patch while in form submiting
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
//create connection to mysql dbs
const connection  = mysql.createConnection({
    host:'localhost',
    user:"root",
    database:"quick_app",
    password:"123456"
});


const getRandomUser = () => {
    return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),

    ]
  }


  //home page
  app.get('/', (req, res) => {
let q = 'select count(*) from user';
    try {
        connection.query(q, (err, result) => {
            if (err)
                throw err;
            else{
                console.log(result)
                res.render('home.ejs',{result})
            }
        })
    } catch (error) {
        console.log(error)
        res.send('error')
    }
  
  })

  //show users

  app.get('/users', (req, res)=>{
    let q = `select * from user`;

    try {
        connection.query(q, (err, result) =>{
            if(err) 
                throw err;
            else{
        res.render('showUsers.ejs', {result})
            }
        })
    } catch (error) {
        res.send(error)
    }
 

  })

  //edit user route show edit fom

  app.get('/users/:id/edit' , (req, res) => {
    let q = `select * from user where id = '${req.params.id}'`;

    try {
        connection.query(q, (err, result) =>{
            if(err) 
                throw err;
            else{
                console.log(result)
        res.render('edit.ejs', {result})
            }
        })
    } catch (error) {
        res.send(error)
    }
  })

  //actutal update in db

  app.patch('/users/:id', (req, res) =>{
let q = `select * from user where id = '${req.params.id}'`;
let {username:NewUsername,password:FormPassword} = req.body;
    
    try {
        connection.query(q, (err, result) =>{
            if(err) 
                throw err;
         if(FormPassword != result[0].password){
            res.send("password doesnot match")
         }else{
            let s = `update user set username = '${NewUsername}' where id = '${req.params.id}'`;
            connection.query(s, (err, result) => {
                if(err)
                    throw err;
                else
                      res.redirect('/users')
            })
      
         }
        })
    } catch (error) {
        res.send(error)
    }
  })

  //create
  app.get('/create', (req, res) => {
res.render('createuser.ejs')
  })

  //add user to db
  app.post('/create', (req, res) => {
  let q = `insert into user(id, username, email, password) values(?,?,?,?);`;
let ob = req.body;
let value = [ob.id, ob.username, ob.email, ob.password];
console.log(value)
  try {
    connection.query(q, value, (err, result) =>{
      if(err){
        throw err;
      }else{
        res.redirect("/")
      }  
    })
  } catch (error) {
    res.send(error);
  }
  })

  //after connecting db or all run my server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
})