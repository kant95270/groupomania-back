const mockHash = "$2b$10$bdPxMEzsh9rsPFGRUvodw.ACRQaPZy2FlqBfa/LrblgALRNJoTjiO"

const user1 = {
     email: "kant95270@gmail.com" ,
      password: mockHash
    }
const user2 = { 
    email: "allo93@hotmail.com" , 
    password: mockHash
}
const user3 = { 
    email: "mathis95270@gmail.com" , 
    password: mockHash
}
const users = [user1, user2, user3]

const  { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


module.exports = { users, prisma }