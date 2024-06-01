var express = require('express');

const db = require("./database/database.js")
const app = express();

const userRoute = require("./route/user.route")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    return next()
})

app.use(
    require("./route/user.route"),

)

app.get("/",(req,res)=>{
    return res.json({hello : "hello"})
})




app.listen(5000 ,() => console.log(`Server initiated and running on port ${5000}`));
