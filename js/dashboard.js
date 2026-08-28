async function loadDashboard(){

const {data,error}=await supabaseClient
.from("berkas")
.select("*")
.order("created_at",{ascending:false});

if(error){
 console.error(error);
 return;
}

document.getElementById("total").innerHTML=data.length;

document.getElementById("selesai").innerHTML=
data.filter(x=>x.status==="Selesai").length;

document.getElementById("proses").innerHTML=
data.filter(x=>x.status!=="Selesai").length;

const posisi={};

data.forEach(item=>{
 posisi[item.posisi]=(posisi[item.posisi]||0)+1;
});

document.getElementById("posisi").innerHTML=
Object.entries(posisi).map(([nama,jumlah])=>`
<div class="position-card">
<strong>${nama}</strong>
<span>${jumlah} berkas</span>
</div>
`).join("");

const kritis=data.filter(item=>{
 if(!item.jatuh_tempo) return false;
 const hari=Math.ceil((new Date(item.jatuh_tempo)-new Date())/(1000*60*60*24));
 return hari<=7;
});

document.getElementById("deadline").innerHTML=`
<div class="warning-box">
🔴 ${kritis.length} berkas membutuhkan perhatian
</div>
`;

}

loadDashboard();
