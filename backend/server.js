const express = require('express');
const userRouter = require('./Routes/userRoute');
const dotenv = require('dotenv/config')
const app = express();
const port = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/user',userRouter)

app.get('/',(req,res)=>res.send('API WORKING'))
app.listen(port,()=>console.log('Server is running on port '+port))