
let semuaData=[];


async function loadDashboardPimpinan(){


const {data,error}=await supabaseClient
.from("berkas")
.select("*");


if(error){

console.error(error);
return;

}


semuaData=data;


const total=data.length;

const selesai=data.filter(
x=>Number(x.progress)===100
).length;


const proses=total-selesai;


const terlambat=data.filter(x=>{

if(!x.jatuh_tempo)return false;

return new Date(x.jatuh_tempo)<new Date()
&& Number(x.progress)<100;

}).length;



totalEl("total",total);
totalEl("selesai",selesai);
totalEl("proses",proses);
totalEl("terlambat",terlambat);



buatGrafikTahap(data);
buatGrafikStatus(selesai,proses,terlambat);
buatPrioritas(data);
buatPosisi(data);

}



function totalEl(id,nilai){

document.getElementById(id).innerHTML=nilai;

}



function buatGrafikTahap(data){

const tahap={};


data.forEach(x=>{

const key=x.posisi||"Belum Ada";

tahap[key]=(tahap[key]||0)+1;

});


new Chart(
document.getElementById("chartTahap"),
{
type:"bar",
data:{
labels:Object.keys(tahap),
datasets:[{
label:"Jumlah Berkas",
data:Object.values(tahap)
}]
}
});

}



function buatGrafikStatus(selesai,proses,terlambat){

new Chart(
document.getElementById("chartStatus"),
{
type:"doughnut",
data:{
labels:[
"Selesai",
"Proses",
"Terlambat"
],
datasets:[{
data:[
selesai,
proses,
terlambat
]
}]
}
});

}



function buatPrioritas(data){

const hasil=data.filter(x=>{

if(!x.jatuh_tempo)return false;

const hari=Math.ceil(
(new Date(x.jatuh_tempo)-new Date())
/(1000*60*60*24)
);

return hari<=7 && x.progress<100;

});


document.getElementById("prioritas").innerHTML = hasil.length ?

hasil.map(x=>`

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



function buatPosisi(data){

const posisi={};


data.forEach(x=>{

let key=x.posisi||"-";

posisi[key]=(posisi[key]||0)+1;

});


document.getElementById("posisi").innerHTML=

Object.entries(posisi)
.map(([a,b])=>`

<div class="card">

<strong>${a}</strong>

<p>${b} berkas</p>

</div>

`).join("");

}


loadDashboardPimpinan();
