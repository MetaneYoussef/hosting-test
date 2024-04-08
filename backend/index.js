const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello");
})



app.listen(3001, () => {
    console.log("Server is Running")
})