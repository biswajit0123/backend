const mongoose = require('mongoose')

main().catch((e) => console.log(e))

async function main() {
 await mongoose.connect('mongodb://localhost:27017/onetofew')  
}

const uSchema = new mongoose.Schema({
    username:String,
    email:String
})
const postSchema = new mongoose.Schema({
    content:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const U = mongoose.model("U", uSchema)
const Post = mongoose.model("Post", postSchema)

const addData = async () => {

    // const u = new U({
    //     username:"munu",
    //     email:"munu@.cmail.com"
    // })
const u = await U.findOne({username:"munu"})
    const p = new Post({
        content:"this is my second post",
        user:u
    })

    await u.save()
    await p.save()
    console.log(p)
}

addData()