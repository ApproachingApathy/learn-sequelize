const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const models = require("./models")




app.use(bodyParser.urlencoded({extended:false}))
app.set("view engine", "pug")

app.get("/", async (req, res) => {
    let data = {}
    data = await models.Show.findAll()
    res.render("index", {
        shows:data
    })
})



app.listen(3000)
