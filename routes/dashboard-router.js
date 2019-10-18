const express = require("express")
const router = express.Router()

const models = require("../models")

router.get("/", (req, res) => {
    if (req.session.isAuthenticated) {
        models.User.findOne({
            attributes:["name", "bio", "first_name", "last_name", "user_flair"],
            where:{id:req.session.userId}
        })
        .then((resolve) => res.render("account-dashboard", {user:resolve}))
        .catch()
    }
    else res.redirect("/account/login")
})

router.post("/profile", (req, res) => {
    if (req.query.editBio) {
        console.log(req.session.userId)
        models.User.findOne({
            attributes:["id", "bio"],
            where:{id:req.session.userId}
        })
        .then((user) => {
            user.bio = req.query.content
            user.save()
            .then(() => res.redirect("/account/dashboard"))
            .catch(() => {
                res.status(500).send()
                console.log("Failed to save!")
            })
        })
        .catch((reason) => {
            res.status(500).send()
            console.log(reason)
            console.log("No such User!")
        })
        
    }
})

module.exports = router