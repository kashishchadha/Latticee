import mongoose from 'mongoose'
import { Schema } from 'mongoose'
const pinSchema=new Schema({
    media:{
        type:String,
        required:true
    },
       height:{
        type:Number,
        required:true
    },
       width:{
        type:Number,
        required:true
    },
       title:{
        type:String,
        required:true
        
    },
     description:  {
        
        type:String,
        required:true
    },

      link:  {
        
        type:String,
    },

      board:  {
           type:Schema.Types.ObjectId,
        ref:"Board"
        
    },

      tags:  {
        
        type:[String],
        required:true
    },
        user:  {
        
        type:Schema.Types.ObjectId,
        ref:"User"
    },
  
},{timestamps:true});
export default mongoose.model("Pin",pinSchema);