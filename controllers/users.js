const jwt = require("jsonwebtoken")
const { prisma } = require("../db/db.js")
const bcrypt = require("bcrypt")

async function logUser(req ,res ) {
    const { email, password } = req.body
    try {    
      const user = await getUser(email)
      if (user == null) return res.status(404).send({error: "User not found"})

    const isPasswordCorrect = await checkPassword(user, password)   
    if (!isPasswordCorrect) return res.status(401).send({ error: "Wrong password" })

    const token = makeToken(email)
    res.send({ token: token ,email: user.email })    
    } catch (error) {
        res.status(500).send({ error })
    }  
}

function makeToken(email) {
    return jwt.sign({ email }, process.env.SECRET, { expiresIn: "24h" }) 
}

function getUser(email) {
    return  prisma.user.findUnique({ where: { email: email}} )
}

function checkPassword(user, password) {
   return bcrypt.compare(password, user.password)
}

async function signupUser(req, res) {
    const { email, password, confirmPassword } = req.body
    console.log("confirmPassword:", confirmPassword)
    console.log("req.body:" , req.body)
    try {
    if (confirmPassword == null) 
    return res.status(400).send({ error: "Please confirm your password" })
    if (password !== confirmPassword)
    return res.status(400).send({ error: "Passwords don't match"})
    const userInDb = await getUser(email)
    if (userInDb != null) return res.status(400).send({ error: "User already exists" })

    const hash = await hashPassword(password)
    const user = await saveUser({ email, password: hash })
    res.send({ user })
    } catch (error) {
        res.status(500).send({ error })
    }   
}
       
function saveUser(user) {
  return  prisma.user.create({ data: user })
}

function hashPassword(password) {
    const NUMBER_OF_SALT_ROUNDS = 10
return bcrypt.hash(password,NUMBER_OF_SALT_ROUNDS)
}

module.exports = { logUser , signupUser }