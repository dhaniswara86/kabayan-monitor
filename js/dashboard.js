async function loadDashboard(){


const {data,error}=await supabaseClient
.from("berkas")
.select("*");


if(error){

console.error(error);
return;

}



document.getElementById("total")
.innerHTML=data.length;



document.getElementById("selesai")
.innerHTML=

data.filter(
x=>x.status==="Selesai"
).length;



document.getElementById("proses")
.innerHTML=

data.filter(
x=>x.status!=="Selesai"
).length;



const posisi={};



data.forEach(item=>{


if(!posisi[item.posisi]){

posisi[item.posisi]=0;

}


posisi[item.posisi]++;

});



document.getElementById("posisi")
.innerHTML=

Object.entries(posisi)
.map(([nama,jumlah])=>{


return `

<div class="position-card">

<strong>
${nama}
</strong>

<span>
${jumlah} berkas
</span>


</div>

`;


}).join("");




const kritis=data.filter(item=>{


const hari=
Math.ceil(
(new Date(item.jatuh_tempo)
-
new Date())
/
(1000*60*60*24)
);


return hari<=7;


});



document.getElementById("deadline")
.innerHTML=

`

<div class="warning-box">

🔴
${kritis.length}
berkas membutuhkan perhatian

</div>

`;



}


loadDashboard();
