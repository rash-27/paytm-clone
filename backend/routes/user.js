const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User ,userValidation ,signinValidation ,updateValidation} = require("../models/user");
const {Bank} = require('../models/banks');
const bcrypt = require("bcrypt");
const {authMiddleware} = require('../middlewares/auth');
const config = require('config');
const _ = require('lodash');


router.post("/signup", async(req, res) => {
  const user = req.body;
  const response = userValidation(user);
  if(!response.success){
    return res.status(400).send(response.error);
  }
  try{
  const checkuser = await User.findOne({email:user.email});
  if(checkuser)return res.status(400).send('User already exist');

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = await User.create(user);
  await Bank.create({userId:newUser._id,bankName:'My Bank',balance:1+Math.floor(Math.random()*1000)});
  const token = jwt.sign({userId:newUser._id},config.get('JwtSecret'));
    res.header('x-auth-token','Bearer '+token).send(token);
  }catch(err){
    console.log(err);
  }
});

router.post("/signin", async(req, res) => {
  const user = req.body;
  const response = signinValidation(user);

  if(!response.success){
    return res.status(400).send(response.error);
  }
  const checkuser = await User.findOne({email:user.email});
  if(!checkuser)return res.status(400).send('User doesnt exist');

    const validPassword = await bcrypt.compare(user.password,checkuser.password);
    if(!validPassword)return res.status(400).send('Invalid password');

  const token = jwt.sign({userId:checkuser._id},config.get('JwtSecret'));
    res.header('x-auth-token','Bearer '+token).send(token);

});


router.put('/update',authMiddleware,async(req,res)=>{
   const userId = req.user.userId;
   //can update name and password
    const user = req.body;
    const response = updateValidation(user);
    if(!response.success){
      return res.status(400).send(response.error);
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newuser = await User.findByIdAndUpdate(userId,{name:user.name,password:user.password},{new:true});
    res.json(_.pick(newuser,['_id','name','email']));

})

router.get('/bulk',authMiddleware,async(req,res)=>{
    const filter = req.query.filter || "";
    const userId = req.user.userId;
    const users = await User.find({name:{$regex:filter,$options:'i'}}).select('_id name email');
    res.json(users.filter(user=>user._id!=userId));

})


module.exports = router;
