const jwt = require("jsonwebtoken")
const { users } = require("../db/db.js")
const bcrypt = require("bcrypt")

function logUser(req ,res ) {
    console.log(req.body)
    const { email, password } = req.body
    const user = getUser(email)
    console.log(user)
    if (user == null) return res.status(404).send({error: "User not found"})

    checkPassword(user, password)
    .then((isPasswordCorrect) => {   
    if (!isPasswordCorrect) return res.status(401).send({ error: "Wrong password" }) 
    const token = makeToken(email)
   return res.send({ token: token ,email: user.email })
    })
    .catch((error) => res.status(500).send({ error })) 
}

function makeToken(email) {
    return jwt.sign({ email }, process.env.SECRET, { expiresIn: "24h" }) 
}

function getUser(email) {
    return users.find((user) => user.email === email)
}

function checkPassword(user, password) {
   return bcrypt.compare(password, user.password)
}

function signupUser(req, res) {
    const { email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.status(400).send({ error:"Passwords don't match" })
    const user = getUser(email)
    if (user != null) return res.status(400).send({ error: "User already exists" })
    hashPassword(password)
    .then((hash) => {
        saveUser({ email, password : hash })
        res.send({ email: email })
    })
    .catch((error) => res.status(500).send({ error }))
}
       
function saveUser(user) {
    users.push(user)
}

function hashPassword(password) {
    const NUMBER_OF_SALT_ROUNDS = 10
return bcrypt.hash(password,NUMBER_OF_SALT_ROUNDS)
}

module.exports = { logUser , signupUser}