import mongoose from 'mongoose';


const { Schema } = mongoose



const UserSchema = new mongoose.Schema({
    name: {
        type : Schema.Types.String,
        required : true
    },
    email: {
        type : Schema.Types.String,
        required : true,
        unique: true
    }, 
   
    password: {

        type : Schema.Types.String,
        // required : true

    },
    cartData:{
        type:Schema.Types.Object,default:{}

    }
    },{minimize:false},
{
    timestamps:{
        createdAt:'create',
        updatedAt:'updated_at'
    }

})
const User = mongoose.model('User', UserSchema);


export default User
