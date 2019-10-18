const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const models = require('../models')

const accHelp = require("../helpers/account-helpers")

router.get("/", (req, res) => {
    if (req.session.isAuthenticated) res.redirect("/");
    else res.redirect("/account/login")
})

router.get("/login", (req, res) => {
    res.render("account-login", {query:req.query})
})

router.get("/signup", (req, res) => {
    res.render("account-signup");
})

router.post("/login", (req, res) => {
    models.User.findOne({
        where: {email: req.body.email}
    })
    .then((resolve) => {
        console.log(resolve)
        bcrypt.compare(req.body.password, resolve.password, (err, same) => {
            if (err) throw err;
            if (same) {
                req.session.isAuthenticated = true,
                req.session.userId = resolve.id
                res.redirect("/account")
            } else res.redirect("/account/login?loginFailed=true")
        })
    })
    .catch((reason) => {
        res.redirect("/account/login?loginFailed=true")
    })
})

router.post("/signup", (req, res) => {
    let encrypter = accHelp.encryptPassword(req.body.password)  
    
    models.User.findOne({
        where: {email: req.body.email}
    })
    .then((user) => {
        console.log("1st")
        if (user) throw new Error("User Already Exists!");
        encrypter
        .then((encryptedPassword) => {
                models.User.create({
                    name:req.body.username,
                    email:req.body.email,
                    password: encryptedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date()

                })
                .then(() => res.redirect("/account/login?signUpSuccessful=true"))
                .catch(() => res.redirect("/account/signup?signUpFailed=true"))
        })
        .catch(() => res.redirect("/account/signup?signUpFailed=true"))
    })
    .catch((error) => res.redirect("/account/signup?signUpFailed=true"))
})


module.exports = router