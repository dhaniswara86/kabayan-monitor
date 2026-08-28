async function loadDashboard(){

const {data:berkas=[]}=await supabase.from('berkas').select('*');

const total=berkas.length;
const selesai=berkas.filter(x=>Number(x.progress)>=100).length;

document.getElementById('total').innerText=total;
document.getElementById('progress').innerText=
total ? Math.round((selesai/total)*100)+'%' : '0%';


const {data:history=[]}=await supabase
.from('workflow_history')
.select('tahap,created_at')
.order('created_at',{ascending:false});


let map={};

history.forEach(x=>{
 map[x.tahap]=(map[x.tahap]||0)+1;
});


document.getElementById('workflow').innerHTML=
Object.entries(map).map(([nama,jumlah])=>`
<div class="item">
<div class="dot"></div>
<div class="content">
<b>${nama}</b>
<div class="bar"><span style="width:${Math.min(jumlah*10,100)}%"></span></div>
</div>
<div class="count">${jumlah}</div>
</div>`).join('');


document.getElementById('activity').innerHTML=
history.slice(0,5).map(x=>`
<div class="activity-item">
${x.tahap}
</div>`).join('');


const today=new Date();
const batas=new Date();
batas.setDate(today.getDate()+7);

const deadline=berkas.filter(x=>{
 if(!x.jatuh_tempo)return false;
 let d=new Date(x.jatuh_tempo);
 return d>=today && d<=batas;
}).length;

document.getElementById('deadline').innerHTML=
`⚠ ${deadline} berkas mendekati jatuh tempo`;

}

loadDashboard();
