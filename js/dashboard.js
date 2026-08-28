async function loadDashboard(){
const {data:berkas=[]}=await supabase.from('berkas').select('*');
const total=berkas.length;
const done=berkas.filter(x=>Number(x.progress)>=100).length;
document.getElementById('total').innerText=total+' Berkas';
document.getElementById('progress').innerText=total?Math.round(done/total*100)+'%':'0%';

const {data:history=[]}=await supabase.from('workflow_history').select('tahap,created_at').order('created_at',{ascending:false});

let count={};
history.forEach(x=>count[x.tahap]=(count[x.tahap]||0)+1);

workflow.innerHTML=Object.entries(count).map(([n,c])=>`
<div class="workflow-item" onclick="openStage('${n}')">
<div class="dot"></div>
<div class="info"><b>${n}</b><div class="bar"><span style="width:${Math.min(c*10,100)}%"></span></div></div>
<strong>${c}</strong>
</div>`).join('');

activity.innerHTML=history.slice(0,5).map(x=>`<div class="activity">${x.tahap}</div>`).join('');

const soon=berkas.filter(x=>x.jatuh_tempo).length;
deadline.innerText=soon+' berkas perlu perhatian';
}

function openStage(stage){
window.location.href='berkas.html?posisi='+encodeURIComponent(stage);
}
function openProgress(){
window.location.href='berkas.html';
}
function openDeadline(){
window.location.href='berkas.html?deadline=true';
}

loadDashboard();
