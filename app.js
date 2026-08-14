const msg=document.getElementById('msg');
async function register(){
 const r=await fetch('/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name.value,email:email.value,password:password.value})});
 const d=await r.json();msg.textContent=d.message||d.error;
}
async function login(){
 const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:loginEmail.value,password:loginPassword.value})});
 const d=await r.json();
 if(d.token){localStorage.token=d.token;location='dashboard.html'}else msg.textContent=d.error;
}