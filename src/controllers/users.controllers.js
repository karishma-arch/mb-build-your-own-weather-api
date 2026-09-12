import { usersTable,passwordResetTable ,locationTable} from "../db/schema.js";
import {eq,and} from 'drizzle-orm'
import {db} from '../app.js'
import bcrypt from 'bcrypt'
import { generateToken,verifyToken } from "../utils/jwt.js";
import config from "../config/config.js";
import crypto from "crypto";

const register=async(req,res)=>{
    const {name,email,password}=req.body

    const [existingUser]=await db.select().from(usersTable)
    .where(eq(usersTable.email,email))

    if(existingUser){
        return res.status(400).json({error:"Email already exists"})
    }

    const hashPassword= await bcrypt.hash(password,10)

    const [user]=await db.insert(usersTable)
    .values({name,email,password:hashPassword}).returning()

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
    "status": 201,
    "message": "User registered successfully",
    user:userWithoutPassword
  })
}

const login = async(req,res)=>{
    const {email,password}=req.body

    const [user]=await db.select().from(usersTable)
    .where(eq(usersTable.email,email))


if(!user){
    return res.status(404).json({
        message:"user not found"
    })
}

const isMatch=await bcrypt.compare(password,user.password)

if(!isMatch){
    return res.status(401).json({
        message:"Invalid password"
    })
}

const token = generateToken({
    id:user.id,
    email:user.email,
})
res.json({
    message:"Login successful",
    token
    
})

}


const forgotPassword=async(req,res)=>{
const {email}=req.body;

const [user]=await db.select().from(usersTable).where(eq(usersTable.email,email))

if(!user){
    return res.status(400).json({
        message:"User with this email doesn't exist"
    })
}
const otp= crypto.randomInt(100000,1000000).toString();
console.log("otp",otp)

const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

await db.insert(passwordResetTable).values({
    userId:user.id,
    otp,
    expiresAt
})

return res.status(200).json({
    message:"OTP generated successfully"
})

}


const verifyOtp=async(req,res)=>{
    const {email,otp}=req.body

    const [user]=await db.select().from(usersTable).where(eq(usersTable.email,email));

if(!user){
    return res.status(400).json({
        message:"User not found"
    })
}

const [data]=await db.select().from(passwordResetTable).where(eq(passwordResetTable.userId,user.id))
if(!data){
    return res.status(400).json({
        message:"OTP not found"
    })
}
if(data.otp !==otp){
    return res.status(400).json({
        message:"Invalid OTP"
    })
}

if(new Date()>data.expiresAt){
    return res.status(400).json({
        message:"OTP expired"
    })
}
return res.status(200).json({
    message:"OTP verified successfully"
})
}

const resetPassword=async(req,res)=>{
    const {email,password}=req.body

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
    .update(usersTable)
    .set({password:hashedPassword})
    .where(eq(usersTable.id,user.id))

    return res.status(200).json({
        message:"User password reset successfully"
    })
}


const logout = async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successful",
  });
};

const getme = async (req, res) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.user.id));

  if (!user) {
    return res.status(401).json({ message: "User is not found" });
  }
  return res.status(200).json({
    message: "Congratulations you are authenticated",
    user,
  });
};
const editUser = async (req, res) => {
  const userId = req.user.id;

  if (req.user.id != req.params.id) {
    return res.status(401).json({
      status: 401,
      message: "You can only edit your own profile",
    });
  }

  const {
    name,
    email,
    phone_number,
    country,
    occupation,
    address,
    dateOfBirth,
  } = req.body;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  if (!user) {
    return res.status(400).json({
      message: "User not found with this id",
    });
  }

  const [newUser] = await db
    .update(usersTable)
    .set({
      name,
      email,
      phone_number,
      country,
      occupation,
      address,
      dateOfBirth,
    })
    .where(eq(usersTable.id, userId))
    .returning();

  return res.status(200).json({
    status: 200,
    message: "User edited successfully",
    data: newUser,
  });
};



const createLocation = async (req, res) => {
  const { location, title } = req.body;

  const userId = req.user.id;

  const newLocation = await db
    .insert(locationTable)
    .values({
      userId,
      location,
      title,
    })
    .returning();

  return res.status(201).json({
    status: 201,
    message: "Location created successfully",
    data: newLocation[0],
  });
};
const getlocation = async (req, res) => {
  const { page, size } = req.query;

  if (page === undefined || size === undefined) {
    return res.status(400).json({
      status: 400,
      message: "Page and size are required",
    });
  }

  const userId = req.user.id;

  const locations = await db
    .select()
    .from(locationTable)
    .where(eq(locationTable.userId, userId))
    .limit(Number(size))
    .offset(Number(page) * Number(size));

  return res.status(200).json({
    status: 200,
    message: "Retrieved all saved locations successfully",
    data: locations,
  });
};

const deleteLocations=async(req,res)=>{
  try{
    const {id}=req.params
  if(!id){
    return res.status(400).json({
      message:"Please send valid id first"
    })
  }

  const [deletedLocation]=await db.delete().from(locationTable)
  .where(
    and(
      eq(locationTable.userId,req.user.id),
      eq(locationTable.id,req.params.id)
    )
  ).returning();
  
  if(!deletedLocation){
    return res.status(404).json({
      status:404,
      message:"Location not found or unauthorized"
    })
  }
  return res.status(200).json({
    "status": 200,
    "message": "Location deleted successfully",
   deletedLocation
  })
}catch(error){
  return res.status(500).json({
    status:500,
    message:"Internal server error"
  })
}
}


const getWeather=async(req,res)=>{
const {id}=req.params

const [location] = await db
  .select()
  .from(locationTable)
  .where(
    and(
      eq(locationTable.userId,req.user.id),
      eq(locationTable.id,id)
    )
  )
  

if (!location) {
  return res.status(400).json({
    message: "Location not found",
  });
}

const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${location.location}&appid=${process.env.OPENWEATHER_API_KEY}`
);

if(!response.ok){
  return res.status(400).json({
    message:"Unable to fetch weather"
  })
}
const data = await response.json()

return res.status(200).json({
  status: 200,
  message:
    "Retrieved current weather by location successfully using OpenWeather API",
  data: data,
});
}




export {
    register,login,getme,logout,forgotPassword,verifyOtp,resetPassword,editUser,createLocation,getlocation,deleteLocations,getWeather
}