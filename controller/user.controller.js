import { log } from "console";
import User from "../model/User.model.js"
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


const registerUser = async (req,res)=> {

    // get data
    // validate
    // check if user already exists
    // create user in database
    // create a verification token
    // save token in database
    // send token as email to user
    // send success status to user
    // res.send("registered");


    const {name, email, password} = req.body
    if (!name || !email || !password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }


    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "user already exists"
            })


        }
    } catch (error) {
        
    }
    
    const userCreate =  await User.create({
        name,
        email,
        password
    })

    if(!userCreate){
        return  res.status(400).json({
                message: "user wasnt created "
        })
    }
    
   try {
     const token = crypto.randomBytes(32).toString("hex") ;
    console.log(token);
    userCreate.verificationToken = token

    await userCreate.save()

    // send email

    const nodemailer = require("nodemailer");


    const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
    },
    });
        
    const mailOptions = {
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: userCreate.email,
        subject:"verifying your email",
        text: `please click on this link: 
        ${process.env.BASE_URL}/api/v1/users/verify/${token}` ,
    };

        await transporter.sendMail(mailOptions)


        res.status(201).json({
            message: "user registered successfully",
            
            success: true,
        });





    } catch (error) {

        res.status(400).json({
            message: "user not registered",
            error,
            
            success: false,
        });
        
    }
        


    };


const verifyuser = async (req,res) => {
    // get token from url
    // validate
    // find user based on token
    // if not
    // set isverified to true
    // remove verification token
    // save
    // return response


    const {token} = req.params;
    console.log(token);
    if(!token){
        return res.status(400).json({
            message: "invalid token"
        })
    }

    const userCreate = User.findOne({verificationToken: token})
    if(!userCreate){
        return res.status(400).json({
            message: "invalid token"
        })
    }


    userCreate.isVerfied = true
    userCreate.verificationToken = undefined
    await userCreate.save()

}
    



const login = async (req,res)=> {
        const {email, password} = req.body


        if(!email || password){
             return res.status(400).json({
            message: "all fields are required"
        })
    }

    try {
        User.findOne({email})

        if(!user){
             return res.status(400).json({
            message: "invalid email or password"
        })
        }

        const isMatch =await bcrypt.compare(password, userCreate.password)

        console.log(isMatch);

        if(!isMatch){
             return res.status(400).json({
            message: "invalid email or password"
        })
        }
        
        const token = jwt.sign({id: userCreate._id, role: userCreate.role},

            "shhhh", {
                expiresIn:'24h'
            }
        ); 
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*1000
        }
        res.cookie("token", token, {})

        res.status(200).json({
            success: true,
            message: "login successful",
            token,
            userCreate:{
                id: userCreate._id,
                name: userCreate.name,
                role: userCreate.role
            }
        })

    } catch (error) {
        
    }


    }
















export {registerUser, verifyuser, login} ;