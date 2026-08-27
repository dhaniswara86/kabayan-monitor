const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const data = daftarBerkas.find(item => item.id === id);

const container = document.getElementById("detailBerkas");

if(!data){

container.innerHTML = `
<div class="card">
Berkas tidak ditemukan
</div>`;

}else{

document.getElementById("namaPerusahaan").innerHTML = data.perusahaan;
document.getElementById("jenisBerkas").innerHTML = data.jenis;


let timeline = "";

data.workflow.forEach(item=>{

let icon = "○";
let cls = "";

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
${item.status==="selesai" ? "Selesai" :
item.status==="aktif" ? "Sedang berjalan" : "Menunggu"}
</p>
</div>
</div>

`;

});


let action = "";

if(currentUser.role==="Pelaksana" && data.posisi==="Pelaksana"){

action = `
<button class="action">
Selesaikan Tahap Pelaksana
</button>
`;

}

else if(currentUser.role==="Penyuluh Pajak" && data.posisi==="Penyuluh Pajak"){

action = `
<button class="action">
Kirim Approval Kepala Seksi
</button>
`;

}

else if(currentUser.role==="Kepala Seksi"){

action = `
<button class="approve">
Setujui Berkas
</button>

<button class="reject">
Kembalikan Berkas
</button>
`;

}

else if(currentUser.role==="Kepala Kantor"){

action = `
<button class="approve">
Approval Akhir
</button>

<button class="reject">
Tolak
</button>
`;

}

else{

action = `
<div class="waiting">
Tidak ada tindakan yang tersedia untuk role Anda
</div>
`;

}


container.innerHTML = `

<div class="card">

<span class="tag">${data.jenis}</span>

<h2>${data.perusahaan}</h2>

<p>Nomor Kasus</p>
<strong>${data.nomorKasus}</strong>

<div class="user-box">
Anda sebagai:
<br>
<strong>${currentUser.nama}</strong>
<br>
${currentUser.role}
</div>

</div>


<div class="card">

<h2>Perjalanan Berkas</h2>

${timeline}

</div>


<div class="card action-box">

<h2>Aksi</h2>

${action}

</div>

`;

}