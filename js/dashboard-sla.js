
async function loadSLA(){

const {data,error}=await supabaseClient
.from("berkas")
.select("*");


if(error){
console.error(error);
return;
}


// rata-rata umur berkas

let totalHari=0;
let jumlahSelesai=0;

data.forEach(x=>{

if(x.progress===100 && x.created_at){

const hari=Math.ceil(
(new Date(x.updated_at||x.created_at)-new Date(x.created_at))
/(1000*60*60*24)
);

totalHari+=hari;
jumlahSelesai++;

}

});


document.getElementById("rataHari").innerHTML =
jumlahSelesai ?
Math.round(totalHari/jumlahSelesai)+" hari"
:
"0 hari";


// selesai bulan berjalan

const bulan=new Date().getMonth();

const selesaiBulan=data.filter(x=>{

return x.progress===100 &&
new Date(x.updated_at||x.created_at).getMonth()===bulan;

}).length;


document.getElementById("selesaiBulan").innerHTML=selesaiBulan;


// SLA terlambat

const lewat=data.filter(x=>{

if(!x.jatuh_tempo)return false;

return new Date(x.jatuh_tempo)<new Date()
&& x.progress<100;

}).length;


document.getElementById("lewatSLA").innerHTML=lewat;



// berkas terlama

const lama=[...data]
.sort((a,b)=>new Date(a.created_at)-new Date(b.created_at))
.slice(0,10);


document.getElementById("terlama").innerHTML=
lama.map(x=>`

<div class="card">

<strong>${x.nama_perusahaan}</strong>

<p>${x.nomor_kasus||"-"}</p>

<p>${x.posisi}</p>

</div>

`).join("");



// kinerja posisi

const posisi={};

data.forEach(x=>{

let p=x.posisi||"-";

posisi[p]=(posisi[p]||0)+1;

});


document.getElementById("kinerja").innerHTML=
Object.entries(posisi)
.map(([a,b])=>`

<div class="card">
<strong>${a}</strong>
<p>${b} berkas</p>
</div>

`).join("");



buatTrend(data);

}



function buatTrend(data){

const trend={};

data.filter(x=>x.progress===100)
.forEach(x=>{

const tanggal=
new Date(x.updated_at||x.created_at)
.toLocaleDateString("id-ID");


trend[tanggal]=(trend[tanggal]||0)+1;

});


new Chart(
document.getElementById("trendChart"),
{
type:"line",
data:{
labels:Object.keys(trend),
datasets:[{
label:"Berkas selesai",
data:Object.values(trend)
}]
}
});

}


loadSLA();
