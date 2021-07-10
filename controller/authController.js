const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require('express-validator')

class AuthController{
    async registration(req,res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:"ошибка при регистрации",errors})
            }
            const {username,password} = req.body
            const candidate = await User.findOne({where:{username:username}})
            if(candidate){
                return res.status(400).json({message:"пользователь с таким username уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password,7);
             const user = await User.create({username,password:hashPassword})
                .then(()=>{
                    res.status(200).json({message:"пользователь был успешно зарегистрирован"})
                })
                .catch(e=>console.log(e.message))
        }catch(e){
            console.log(e)
            res.status(400).json({message:"Registration error"})
        }
    }
    async login(req,res){
        try{
            const {username,password} = req.body
            const user = await User.findOne({where:{username:username}})
            if(!user){
                return res.status(400).json({message:`пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return res.status(400).json({message:"Неверно введен пароль"})
            }
            else {
                const token = jwt.sign({
                    id:user.id,
                    username: user.username
                }, process.env.SECRET_KEY, {expiresIn: "1h"})
                return res.send({
                    token: `Bearer ${token}`,
                    user: {
                        id:user.id,
                        username: user.username
                    }
                })
            }
        }catch(e){
            console.log(e)
            res.status(400).json({message:"Login error"})
        }
    }

    async getUsers(req,res){
        try{
            const users = await User.findAll({})
            res.json(users)
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = new AuthController()