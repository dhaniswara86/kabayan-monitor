const params = new URLSearchParams(window.location.search);
const id=params.get("id");

const data=daftarBerkas.find(x=>x.id===id);

const container=document.getElementById("detailBerkas");


if(data){

document.getElementById("namaPerusahaan").innerHTML=data.perusahaan;
document.getElementById("jenisBerkas").innerHTML=data.jenis;


let timeline="";

data.workflow.forEach(x=>{

let icon="○";

if(x.status==="selesai") icon="✓";
if(x.status==="aktif") icon="●";
if(x.status==="revisi") icon="↩";


timeline+=`

<div class="step">

<div class="icon">${icon}</div>

<div>

<strong>${x.tahap}</strong>

<p>${x.status}</p>

</div>

</div>

`;

});


let action="";


if(currentUser.role==="Penyuluh Pajak" &&
data.posisi==="Penyuluh Pajak"){

action=`
<button class="action"
onclick="prosesApproval('${data.id}','approve')">
Kirim Approval Kepala Seksi
</button>
`;

}


if(currentUser.role==="Kepala Seksi"){

action=`

<button class="approve"
onclick="prosesApproval('${data.id}','approve')">
✓ Setujui
</button>


<button class="reject"
onclick="prosesApproval('${data.id}','return','Dokumen perlu dilengkapi')">
↩ Kembalikan
</button>

`;

}


if(currentUser.role==="Kepala Kantor"){

action=`

<button class="approve"
onclick="prosesApproval('${data.id}','approve')">
✓ Approval Akhir
</button>


<button class="reject"
onclick="prosesApproval('${data.id}','reject','Tidak disetujui')">
✕ Tolak
</button>

`;

}


let history="";

data.history.forEach(h=>{

history+=`

<div class="history">

<strong>${h.tanggal}</strong>

<p>${h.user}</p>

<span>${h.aksi}</span>

${h.catatan ? `<small>${h.catatan}</small>`:""}

</div>

`;

});


container.innerHTML=`

<div class="card">

<h2>${data.perusahaan}</h2>

<p>${data.nomorKasus}</p>

<p>
Posisi:
<strong>${data.posisi}</strong>
</p>

${action}

</div>


<div class="card">

<h2>Perjalanan Berkas</h2>

${timeline}

</div>


<div class="card">

<h2>Riwayat Aktivitas</h2>

${history}

</div>

`;

}