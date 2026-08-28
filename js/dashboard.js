
async function loadDashboard(){

const {data,error}=await supabaseClient
.from("berkas")
.select("*")
.order("created_at",{ascending:false});

if(error){
 console.error(error);
 return;
}


// Ringkasan
document.getElementById("total").innerHTML = data.length;

document.getElementById("selesai").innerHTML =
data.filter(x=>x.status==="Selesai").length;

document.getElementById("proses").innerHTML =
data.filter(x=>x.status!=="Selesai").length;


// Posisi
const posisi={};

data.forEach(item=>{
 posisi[item.posisi]=(posisi[item.posisi]||0)+1;
});

document.getElementById("posisi").innerHTML =
Object.entries(posisi).map(([nama,jumlah])=>`

<div class="position-card">
<strong>${nama}</strong>
<span>${jumlah} berkas</span>
</div>

`).join("");


// Deadline
const kritis=data.filter(item=>{

if(!item.jatuh_tempo) return false;

const hari=Math.ceil(
(new Date(item.jatuh_tempo)-new Date())
/(1000*60*60*24)
);

return hari<=7;

});


document.getElementById("deadline").innerHTML=`

<div class="warning-box">
🔴 ${kritis.length} berkas membutuhkan perhatian
</div>

`;


// Daftar berkas
const daftar=document.getElementById("daftar-berkas");

if(daftar){

daftar.innerHTML=data.map(item=>`

<div class="berkas-card">

<h3>${item.nama_perusahaan}</h3>

<p>
Nomor Kasus:
<strong>${item.nomor_kasus}</strong>
</p>

<p>
Jenis:
${item.jenis_permohonan || "-"}
</p>

<p>
Posisi:
${item.posisi || "-"}
</p>

<div>
${item.progress || 0}% selesai
</div>

<a href="detail-berkas.html?id=${item.id}">
Lihat Detail →
</a>

</div>

`).join("");

}

}


loadDashboard();
