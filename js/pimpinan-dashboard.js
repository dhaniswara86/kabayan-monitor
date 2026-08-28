
async function loadPimpinanDashboard(){


const {data,error}=await supabaseClient
.from("berkas")
.select("*");


if(error){

console.error(error);
return;

}


const total=data.length;

const selesai=data.filter(
x=>x.progress===100
).length;


const proses=total-selesai;


const terlambat=data.filter(x=>{

if(!x.jatuh_tempo) return false;

return new Date(x.jatuh_tempo)<new Date()
&& x.progress<100;

}).length;


document.getElementById("total").innerHTML=total;
document.getElementById("selesai").innerHTML=selesai;
document.getElementById("proses").innerHTML=proses;
document.getElementById("terlambat").innerHTML=terlambat;



const tahap={};

data.forEach(x=>{

let key=x.posisi || "Belum ada";

tahap[key]=(tahap[key]||0)+1;

});


document.getElementById("tahapan").innerHTML =
Object.entries(tahap)
.map(([k,v])=>`

<div class="card">

<strong>${k}</strong>

<p>${v} berkas</p>

</div>

`).join("");



document.getElementById("posisi").innerHTML =
Object.entries(tahap)
.map(([k,v])=>`

<div>

${k}: ${v}

</div>

`).join("");



const prioritas=data.filter(x=>{

if(!x.jatuh_tempo)return false;

const hari=Math.ceil(
(new Date(x.jatuh_tempo)-new Date())
/(1000*60*60*24)
);

return hari<=7 && x.progress<100;

});



document.getElementById("prioritas").innerHTML =
prioritas.length ?

prioritas.map(x=>`

<div class="card">

<strong>${x.nama_perusahaan}</strong>

<p>${x.nomor_kasus}</p>

<p>${x.posisi}</p>

<p>Progress ${x.progress}%</p>

</div>

`).join("")

:

"<p>Tidak ada berkas prioritas</p>";



}


loadPimpinanDashboard();
