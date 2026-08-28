async function loadDashboard(){

const user = JSON.parse(localStorage.getItem("user"));

if(user){

document.getElementById("welcome").innerHTML =
`Selamat datang, <strong>${user.nama}</strong> (${user.role})`;

}


const {data,error}=await supabaseClient
.from("berkas")
.select("*")
.order("created_at",{ascending:false});


if(error){

console.error(error);
return;

}


document.getElementById("total").innerHTML=data.length;


document.getElementById("selesai").innerHTML =
data.filter(x=>x.status==="Selesai" || x.progress===100).length;


document.getElementById("proses").innerHTML =
data.filter(x=>x.progress!==100).length;



const posisi={};

data.forEach(item=>{

const key=item.posisi || "Belum ditentukan";

posisi[key]=(posisi[key]||0)+1;

});


document.getElementById("posisi").innerHTML =
Object.entries(posisi).map(([nama,jumlah])=>`

<div class="position-card">

<strong>${nama}</strong>

<span>${jumlah} berkas</span>

</div>

`).join("");



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



const daftar=document.getElementById("daftar-berkas");


daftar.innerHTML=data.map(item=>`

<div class="berkas-card">

<h3>${item.nama_perusahaan}</h3>

<p>${item.nomor_kasus || "-"}</p>

<p>${item.posisi || "-"}</p>


<div class="progress-mini">

<div style="width:${item.progress || 0}%"></div>

</div>


<strong>${item.progress || 0}%</strong>


<br>

<a href="detail-berkas.html?id=${item.id}">
Lihat Detail →
</a>


</div>

`).join("");


}


loadDashboard();
