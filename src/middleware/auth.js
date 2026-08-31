
const auth = (req,res,next)=>{

   const token= req.cookies.token

   if(!token){
    return res.status(400).json({
        message:"Invalid token"
    })
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET)

req.user= decoded

next()
}