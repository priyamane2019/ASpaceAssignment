const mongooose = require('mongoose');
const bcrypt = require('bcryptjs')
// const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const userSchema = new mongooose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
          token:{
            type:String,
            required:true
          }
        }
    ]

})
//Hashing Password

userSchema.pre('save', async function (next){
    
    if(this.isModified('password'))
    {
    this.password =await bcrypt.hash(this.password, 12);
    this.cpassword =await bcrypt.hash(this.cpassword, 12);
    }
next();
})
//generating Token
userSchema.methods.generateAuthToken = function (){
   let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);//here _id is payload which is unque
  this.tokens=this.tokens.concat({token:token}) 
 this.save();
  return token;   
}

const User = mongooose.model("User", userSchema);
module.exports = User;