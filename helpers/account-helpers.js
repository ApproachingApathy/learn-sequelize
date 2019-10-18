const bcrypt = require("bcrypt")

/** Creates a promise 
 * 
 * @param {*} rawPassword 
 */
function encryptPassword (rawPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(rawPassword, 10, (err, encrypted) => {
            if (err) throw err;
            else resolve(encrypted);
        })
        setTimeout(()=> {
            reject("Password hasher took to long.")
        }, 1000)
    })
}


module.exports = {
    encryptPassword:encryptPassword
}