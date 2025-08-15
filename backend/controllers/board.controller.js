import Board from '../model/board.model.js'
import Pin from "../model/pin.model.js"
export const getboard= async (req,res)=>{

    const {userid}=req.params
    const board=await Board.find({user:userid});
    const boardwithpindetails=await Promise.all(board.map(async (board)=>{
        const pinCount=await Pin.countDocuments({board:board._id});
        const firstPin=await Pin.findOne({board:board._id});
        return{
            ...board.toObject(),
            pinCount,
            firstPin
        };
       
    }));
 res.status(200).json(boardwithpindetails)

}