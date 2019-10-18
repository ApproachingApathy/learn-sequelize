const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const models = require("./models")
const session = require("express-session")

const accountRouter = require("./routes/account-router")




app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(session({
    secret:"Nina Tucker deserved better. I cry every time.",
    resave:false,
    saveUninitialized:true,
}))
app.set("view engine", "pug")

app.use("/account", accountRouter)

app.get("/", async (req, res) => {
    let data = {}
    data = await models.Show.findAll()
    res.render("index", {
        shows:data
    })
})



app.listen(3000)
