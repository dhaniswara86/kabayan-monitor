async function loadDetail(){

const id=new URLSearchParams(location.search).get('id');

const {data:berkas}=await supabase
.from('berkas')
.select('*')
.eq('id',id)
.single();

if(!berkas)return;

company.innerText=berkas.nama_perusahaan||'-';
case.innerText=berkas.nomor_kasus||'-';
status.innerText=berkas.status||'-';
progress.innerText=(berkas.progress||0)+'%';
jenis.innerText=berkas.jenis_permohonan||'-';
posisi.innerText=berkas.posisi||'-';
tempo.innerText=berkas.jatuh_tempo||'-';


const {data:history=[]}=await supabase
.from('workflow_history')
.select('*')
.eq('berkas_id',id)
.order('created_at',{ascending:true});


timeline.innerHTML=history.map((x,i)=>`
<div class="timeline-item">
<div class="dot">${i+1}</div>
<div>
<b>${x.tahap}</b>
<p>${x.catatan||''}</p>
</div>
</div>`).join('');


if(history.length){
let last=history[history.length-1];
activity.innerHTML=`
<b>${last.tahap}</b><br>
${last.catatan||''}<br>
${last.created_at||''}`;
}

}

loadDetail();
