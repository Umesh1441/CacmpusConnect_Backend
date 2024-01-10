const mongoose=require('mongoose');
const bcrypt=require('bcrypt')


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        default:''
    },
    posts:{
        type:Array,
        default:[],
    },
    followers:{
        type:Array,
        default:[],
    },
    following:{
        type:Array,
        default:[],
    },
    description:{
        type:String,
        default:'',
    },
    allmessages:{
        type:Array,
        default:[],
    }
})

//for hashing
userSchema.pre('save',async function(next){
    const user=this;
    console.log("just before pass is ",user.password);
    if(!user.isModified('password')){
        return next();
    }
    user.password=await bcrypt.hash(user.password,10);
    console.log("just before pass is ",user.password);
    next();
    
})

mongoose.model("User",userSchema);