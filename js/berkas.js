let allData=[];

async function loadBerkas(){

const {data,error}=await supabase
.from('berkas')
.select('*')
.order('created_at',{ascending:false});

if(error){
console.log(error);
return;
}

allData=data||[];

createFilters();
render(allData);

document.getElementById('total').innerText=
allData.length+' total berkas';

}


function createFilters(){

const posisi=[...new Set(allData.map(x=>x.posisi).filter(Boolean))];

document.getElementById('filters').innerHTML=
`<button class="active" data-filter="all">Semua</button>`+
posisi.map(x=>`
<button data-filter="${x}">${x}</button>
`).join('');

document.querySelectorAll('.filters button')
.forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll('.filters button')
.forEach(x=>x.classList.remove('active'));

btn.classList.add('active');

if(btn.dataset.filter==='all'){
render(allData);
}else{
render(allData.filter(x=>x.posisi===btn.dataset.filter));
}
}
});

}


function render(data){

document.getElementById('list').innerHTML=
data.map(x=>`

<div class="card" onclick="openDetail('${x.id}')">

<div class="company">${x.nama_perusahaan||'-'}</div>

<div class="case">
${x.nomor_kasus||'-'}
</div>

<div class="position">
${x.posisi||'-'}
</div>

<div class="progress">
<span style="width:${x.progress||0}%"></span>
</div>

<div class="deadline">
Progress ${x.progress||0}% · Jatuh tempo ${x.jatuh_tempo||'-'}
</div>

</div>

`).join('');

}


document.getElementById('search').oninput=(e)=>{

let key=e.target.value.toLowerCase();

render(
allData.filter(x=>
(x.nama_perusahaan||'').toLowerCase().includes(key) ||
(x.nomor_kasus||'').toLowerCase().includes(key)
)
);

}


function openDetail(id){

window.location.href='detail-berkas.html?id='+id;

}


loadBerkas();
