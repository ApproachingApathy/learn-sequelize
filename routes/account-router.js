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
    encrypter.then((resolve) => {
        console.log("1st")
        models.User.findOne({
            where: {email: req.body.email}
        })
        .then((resolve) => {
            console.log("2nd")
            console.log(resolve)
            if(resolve) res.redirect("/account/signup?signUpFailed=true");
            else {
                models.User.create({
                    name:req.body.username,
                    email:req.body.email,
                    password: resolve,
                })
                .then(() => res.redirect("/account/login?signUpSuccessful=true"))
                .catch(() => res.redirect("/account/signup?signUpFailed=true"))
            }
        })
        .catch(() => res.redirect("/account/signup?signUpFailed=true"))
    })
    .catch(() => res.redirect("/account/signup?signUpFailed=true"))
})


module.exports = router