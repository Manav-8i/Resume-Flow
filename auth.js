const express=require('express');
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const db=require('../db');
const sessions=require('../sessions');
const router=express.Router();

router.post('/register',async(req,res)=>{
 try{
  const {name,email,password}=req.body;
  if(!name||!email||!password)return res.status(400).json({error:'All fields are required'});
  const hash=await bcrypt.hash(password,10);
  const [r]=await db.execute('INSERT INTO users(name,email,password) VALUES(?,?,?)',[name,email,hash]);
  res.status(201).json({message:'Registered successfully',userId:r.insertId});
 }catch(e){res.status(400).json({error:e.code==='ER_DUP_ENTRY'?'Email already exists':e.message});}
});

router.post('/login',async(req,res)=>{
 const {email,password}=req.body;
 const [rows]=await db.execute('SELECT * FROM users WHERE email=?',[email]);
 if(!rows.length||!(await bcrypt.compare(password,rows[0].password)))
  return res.status(401).json({error:'Invalid email or password'});
 const token=crypto.randomBytes(32).toString('hex');
 sessions.set(token,rows[0].id);
 res.json({message:'Login successful',token,user:{id:rows[0].id,name:rows[0].name,email:rows[0].email}});
});

router.post('/logout',(req,res)=>{
 const token=req.headers.authorization?.replace('Bearer ','');
 sessions.delete(token);res.json({message:'Logged out'});
});
module.exports=router;
