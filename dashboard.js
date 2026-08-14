const token=localStorage.token;if(!token)location='index.html';
async function load(){
 const r=await fetch('/api/resumes',{headers:{Authorization:'Bearer '+token}});
 const data=await r.json();
 list.innerHTML=data.map(x=>`<div class="resume"><strong>${x.title}</strong><p>${x.summary||''}</p></div>`).join('')||'<p>No resumes yet.</p>';
}
async function createResume(){
 await fetch('/api/resumes',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({title:title.value,summary:summary.value,template:template.value})});load();
}
async function logout(){await fetch('/api/auth/logout',{method:'POST',headers:{Authorization:'Bearer '+token}});localStorage.removeItem('token');location='index.html'}
load();