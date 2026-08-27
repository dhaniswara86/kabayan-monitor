const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const data = daftarBerkas.find(
(item)=> item.id === id
);


if(!data){

document.getElementById("detailBerkas").innerHTML =
"<p>Berkas tidak ditemukan</p>";

}else{


document.getElementById("namaPerusahaan").innerHTML =
data.perusahaan;


document.getElementById("jenisBerkas").innerHTML =
data.jenis;


let timeline = "";


const tahapan = [
"Pelaksana",
"Disposisi Kasi Pelayanan",
"Penyuluh Pajak",
"Approval Kepala Seksi",
"Approval Kepala Kantor",
"Arsip"
];


tahapan.forEach((tahap,index)=>{

let aktif =
tahap === data.posisi;


let selesai =
index < Math.floor(data.progress / 20);


timeline += `

<div class="step ${aktif ? "active":""} ${selesai ? "done":""}">

<div class="icon">

${selesai ? "✓" : aktif ? "●" : "○"}

</div>


<div>

<strong>
${tahap}
</strong>


<p>

${
aktif 
? "Sedang berjalan"
: selesai
? "Selesai"
: "Menunggu"
}

</p>


</div>

</div>

`;

});


document.getElementById("detailBerkas").innerHTML = `


<div class="summary card">

<span class="tag">
${data.jenis}
</span>


<h2>
${data.perusahaan}
</h2>


<p>
Nomor Kasus
</p>

<strong>
${data.nomorKasus}
</strong>


<div class="info">

<div>
<span>Progress</span>
<b>${data.progress}%</b>
</div>


<div>
<span>Deadline</span>
<b>${data.jatuhTempo}</b>
</div>


</div>


</div>



<div class="card">

<h2>
Perjalanan Berkas
</h2>

${timeline}

</div>


`;

}