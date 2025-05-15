const mongoose = require('mongoose')

main().catch((e) => console.log(e))

async function main() {
 await mongoose.connect('mongodb://localhost:27017/onetofew')  
}

const orderSchema = new mongoose.Schema({
    item:String,
    price:Number
})


const Order = mongoose.model("Order", orderSchema)

const custSchema = mongoose.Schema({
    username:String,
    orders:[
        {     
             type:mongoose.Schema.Types.ObjectId,  
                ref:"Order"
        }

    ]
})
   custSchema.post("findOneAndDelete",async function(data){
            const deletedorder = await Order.findOneAndDelete({_id: {$in : data.orders}});

            console.log("deleted order",deletedorder)
           })      
      

const Custom = mongoose.model("Custom", custSchema)

// add anew customer

// const addCutomers = async () =>{

//     //find that oder from object suppose he buy chip
//     const o1 = await Order.findOne({item:"chip"})
//     const o2 = await Order.findOne({item:"chocolate"})


//     const cust1 = new Custom({
//         username:"munu",
//         orders:[]
//     })
//     cust1.orders.push(o1)
//     cust1.orders.push(o2)
//     let res = await cust1.save()
//     console.log(res)
// }
// addCutomers()

const findCustomer = async () => {
    const customer = await Custom.find({}).populate("orders")
    console.log(customer[0])
}
// findCustomer()

//add a new order to db

// const addOrder = async()=>{

//     const orders =await Order.insertMany( 
//         [
//        {item:"chip",price:23},
//         {item:"chocolate",price:27},
//         {item:"samosa",price:10},
//         ]
 
//     )
//     console.log(orders)
// }

// addOrder()

                                //add a customer and order 
          const addCustomerOrder = async () =>{
            
            const order1 = await Order({
                item:"sayd",
                price:40
            })
            const customer1 = await Custom({
                username:"rohi",
            })
            customer1.orders.push(order1);

            await order1.save()
            await customer1.save()

            console.log(customer1)
          }                      

          //addCustomerOrder()
                 
                               //delste the customer and its orders

            //mongoose middleware 
         
           const deleteCustomer = async() =>{
                 
            const c1 = await Custom.findByIdAndDelete("68246bdf169d8ad583e7b870 ")
            console.log(c1)

           }  
        deleteCustomer()                  