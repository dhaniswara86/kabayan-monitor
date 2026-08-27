const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const data = daftarBerkas.find(item => item.id === id);

const container = document.getElementById("detailBerkas");

if(!data){

container.innerHTML = `
<div class="card">
Berkas tidak ditemukan
</div>
`;

}else{

document.getElementById("namaPerusahaan").innerHTML = data.perusahaan;
document.getElementById("jenisBerkas").innerHTML = data.jenis;


const selesai = data.workflow.filter(
x=>x.status==="selesai"
).length;

const progress = Math.round(
(selesai + 0.5) / data.workflow.length * 100
);


let timeline = "";

data.workflow.forEach(item=>{

let icon="○";
let cls="";

if(item.status==="selesai"){
icon="✓";
cls="done";
}

if(item.status==="aktif"){
icon="●";
cls="active";
}


timeline += `

<div class="step ${cls}">

<div class="icon">${icon}</div>

<div>
<strong>${item.tahap}</strong>

<p>
${
item.status==="selesai"
? "Selesai"
: item.status==="aktif"
? "Sedang berjalan"
: "Menunggu"
}
</p>

${
item.tanggal
?
`<small>${item.tanggal} - ${item.petugas}</small>`
:""
}

</div>

</div>

`;

});


container.innerHTML = `

<div class="card">

<span class="tag">${data.jenis}</span>

<h2>${data.perusahaan}</h2>

<p>Nomor Kasus</p>

<strong>${data.nomorKasus}</strong>


<div class="summary-box">

<div>
<span>Progress</span>
<b>${progress}%</b>
</div>

<div>
<span>Posisi</span>
<b>${data.posisi}</b>
</div>

</div>

</div>


<div class="card">

<h2>Perjalanan Berkas</h2>

${timeline}

</div>

`;

}