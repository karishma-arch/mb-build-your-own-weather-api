import { usersTable } from "../db/schema"
import { eq } from "drizzle-orm"
import {bcrypt} from 'bcrypt'
import { db } from "../app.js"

const register= async(req,res)=>{
    const {name,email,password}=req.body

    const [existingUser]=await db.select().from(usersTable)
    .where(eq(usersTable.email,email))
if(existingUser){
     return res.status(400).json({message:"User with this email already exists"})

}
   
    const hashPassword=await bcrypt.hash(password,10)

    const [user]=await db.insert(usersTable).values({
        name,
        email,
        password
    }).returning()

    return res.status(200).json({message:"User registered successfully"})
}

const login = async(req,res)=>{
    const {email,password}=req.body

    const [existingUser]= await db.select().from(usersTable).where(eq(usersTable.email,email))

if(!existingUser){
    return res.status(400).json({
        message:"user with this email doesnt exist"
    })
   } 
   const hashPassword=await bcrypt.compare(password,10)

   if(!hashPassword){
    return res.status(400).json({
        message:"Invalid password"
    })
   }


const token = jwt.sign({
    id:user.id,
    email:user.email
},process.env.JWT_SECRET,{expiresIn:"15m"})

res.cookie("token",token,{
    httpOnly:true
})

return res.status(200).json({
    message:"User logged in"
})
}

const getme=async(req,res)=>{

    const [user]=await db.select().from(usersTable).where(eq(usersTable.id,req.user.id)).returning()
if (!user) {
  return res.status(404).json({
    message: "User not found",
  });
}

 if(!user){
    return res.status(400).json({message:"User with this id is not found"})
 }

 return res.status(200).json({
    message:"User with this id is authenticated"
 })
}

const logout = async(req,res)=>{
    res.clearCookie("token")

    return res.status(200).json({
        message:"Logout successful"
    })
}


export {
    register,
    login,getme
}