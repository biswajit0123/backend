const mongoose = require('mongoose')

main().catch((e) => console.log(e))

async function main() {
 await mongoose.connect('mongodb://localhost:27017/onetofew')  
}

const userSchema = new mongoose.Schema({
    username:String,
    address:[
        {
           _id:false,location:String, city:String,
        }
    ]
})

const User = mongoose.model("User", userSchema)



const insert =async ()=>{

    const user1 = new User({
        username:"biswajit",
        address:[{location:"sahin bazar 456", city:"kolkata"},{location:"laxmisagr lb 35123", city:"bhubaneswar"}]
    })

    user1.address.push({location:"kurunjipur bheteswar",city:"khurdha"})

   let res=await user1.save()
   console.log(res)
}


insert()