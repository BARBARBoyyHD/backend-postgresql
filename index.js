const express = require("express");
const app = express()
const cors = require("cors");
const pool = require("./db")
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/api',(req,res)=>{
    res.send("Hello World")
    res.status(200).json("Hello World")

})

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})