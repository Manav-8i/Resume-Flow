const express=require('express');
const db=require('../db');
const auth=require('../middleware/auth');
const router=express.Router();
router.use(auth);

router.get('/',async(req,res)=>{
 const [rows]=await db.execute('SELECT * FROM resumes WHERE user_id=? ORDER BY updated_at DESC',[req.userId]);
 res.json(rows);
});

router.post('/',async(req,res)=>{
 const {title,summary,template}=req.body;
 const [r]=await db.execute(
  'INSERT INTO resumes(user_id,title,summary,template) VALUES(?,?,?,?)',
  [req.userId,title||'My Resume',summary||'',template||'classic']
 );
 res.status(201).json({id:r.insertId,message:'Resume created'});
});

router.get('/:id',async(req,res)=>{
 const [r]=await db.execute('SELECT * FROM resumes WHERE id=? AND user_id=?',[req.params.id,req.userId]);
 if(!r.length)return res.status(404).json({error:'Resume not found'});
 const [education]=await db.execute('SELECT * FROM education WHERE resume_id=?',[req.params.id]);
 const [skills]=await db.execute('SELECT * FROM skills WHERE resume_id=?',[req.params.id]);
 const [experience]=await db.execute('SELECT * FROM experience WHERE resume_id=?',[req.params.id]);
 const [projects]=await db.execute('SELECT * FROM projects WHERE resume_id=?',[req.params.id]);
 res.json({...r[0],education,skills,experience,projects});
});

router.put('/:id',async(req,res)=>{
 const {title,summary,template}=req.body;
 const [r]=await db.execute(
  'UPDATE resumes SET title=?,summary=?,template=? WHERE id=? AND user_id=?',
  [title,summary,template||'classic',req.params.id,req.userId]
 );
 if(!r.affectedRows)return res.status(404).json({error:'Resume not found'});
 res.json({message:'Resume updated'});
});

router.delete('/:id',async(req,res)=>{
 const [r]=await db.execute('DELETE FROM resumes WHERE id=? AND user_id=?',[req.params.id,req.userId]);
 if(!r.affectedRows)return res.status(404).json({error:'Resume not found'});
 res.json({message:'Resume deleted'});
});
module.exports=router;
