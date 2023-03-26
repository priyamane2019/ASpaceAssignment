const mongoose=require("mongoose");
mongoose.connect(process.env.database).then(()=>{
    console.log("Connection DB successfully");
}).catch((err)=>{
    console.log("No DB Connection");
})