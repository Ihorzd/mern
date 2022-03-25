const {Router}=require('express')
const bcrypt = require('bcryptjs')
const {check,validationResult}=require('express-validator')
const router =Router()
const User = require('../models/User')
// api/auth
router.post(
    '/register',
    [
        check('email','not correct email').isEmail(),
        check('password','min length 6 symbol')
        .isLength({min:6})
    ] ,
    async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message:'not correct data'
            })
        }

        const{email,password }=req.body
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message:'такий кандидат вже існує'})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email, password:hashedPassword})

        await user.save()

        res.status(201).json({message:'Користувач створений'})
    }catch(e){
        res.status(500).json({message:'щось пішло не так спробуйте знову'})
    }
})
router.post('/login',
    [
        check('email','enter corectemail').normalizeEmail().isEmail(),
        check('password','enter password').exists()
    ],
    async(req,res)=>{
        try{
            const errors = validationResult(req);
            if(errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message:'not correct data when enter'
                })
            }
            const {email,password}= req.body
            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message:'user not found'})
            }
    
            
        }catch(e){
            res.status(500).json({message:'щось пішло не так спробуйте знову'})
        }
})

module.exports= router