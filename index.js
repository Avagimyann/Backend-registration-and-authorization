const express = require("express")
const User = require("./model/User")
const authRouter = require("./routes/authRouter")
require('dotenv').config()
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use("/api",authRouter)

const start = async () => {
    await User.sync()
        .then(()=>{app.listen(PORT,()=>{
            console.log("Сервер ожидает подключения на порту " + PORT)
        })})
        .catch(err=>{
            console.log(err.message)
        });
}
start()