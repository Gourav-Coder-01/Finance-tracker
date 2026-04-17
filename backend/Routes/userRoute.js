const express = require('express')
const userRouter = express.Router();

userRouter.post('/register',(req,res)=>{
      res.status(200).json({message:'hello'})
})

module.exports = userRouter