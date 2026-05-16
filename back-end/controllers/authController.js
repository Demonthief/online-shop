import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req,res) =>{
    try{
        const {name,email,password} = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message : "User sudah ada"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password : hashedPassword
        })

        res.status(201).json({
            message : "User Berhasil Dibuat",
            user
        })
    }catch(e){
        res.status(500).json({message : e.message})
    }
}

export const login = async (req,res) => {
    try{
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message : "User tidak ditemukan"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message : "Gagal login, Cek Email atau Password Anda"})
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
        )

        res.json({
            message : "Berhasil login",
            token,
            user
        })

    }catch(e){
        res.status(500).json({message : e.message})
    }
}