
const params=new URLSearchParams(location.search);
const data=daftarBerkas.find(x=>x.id===params.get("id"));
const container=document.getElementById("detailBerkas");

if(data){
document.getElementById("namaPerusahaan").innerHTML=data.perusahaan;
document.getElementById("jenisBerkas").innerHTML=data.jenis;

let timeline="";
data.workflow.forEach(x=>{
timeline+=`
<div class="step">
<strong>${x.status==="selesai"?"✓":x.status==="aktif"?"●":"○"} ${x.tahap}</strong>
<p>${x.status}</p>
</div>`;
});

let history="";
data.history.forEach(x=>{
history+=`<div class="history">${x.tanggal}<br>${x.user}<br>${x.aksi}</div>`;
});

container.innerHTML=`
<div class="card">
<h2>${data.perusahaan}</h2>
<p>${data.nomorKasus}</p>
<button class="action" onclick="lanjutkanWorkflow('${data.id}')">Lanjutkan Tahap</button>
</div>
<div class="card"><h2>Perjalanan Berkas</h2>${timeline}</div>
<div class="card"><h2>Riwayat Aktivitas</h2>${history}</div>`;
}
