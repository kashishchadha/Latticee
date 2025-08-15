import express from 'express';
const app = express();
import cors from 'cors'
import userRouter from './routes/user.route.js'
import commentRouter from './routes/comment.route.js'
import boardRouter from './routes/board.route.js'
import connectDB from './utils/connectDB.js';
import pinRouter from './routes/pin.route.js'
app.use(express.json());
app.use(cors({origin:process.env.CLIENT_URL}))
app.use('/user',userRouter);
app.use('/pin',pinRouter);
app.use('/comment',commentRouter);
app.use('/board',boardRouter);


app.listen(3000,()=>{
    connectDB();
    console.log("server is running1");
})