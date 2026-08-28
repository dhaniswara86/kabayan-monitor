
async function loadDetail(){

const params = new URLSearchParams(location.search);
const id = params.get("id");

if(!id) return;


const {data:berkas,error}=await supabaseClient
.from("berkas")
.select("*")
.eq("id",id)
.single();


if(error){
 console.error(error);
 return;
}


// Informasi utama
document.getElementById("nama").innerHTML = berkas.nama_perusahaan;
document.getElementById("nomor").innerHTML = berkas.nomor_kasus;
document.getElementById("jenis").innerHTML = berkas.jenis_permohonan || "-";
document.getElementById("posisi").innerHTML = berkas.posisi || "-";
document.getElementById("progress").innerHTML = `${berkas.progress || 0}% selesai`;
document.getElementById("deadline").innerHTML =
new Date(berkas.jatuh_tempo).toLocaleDateString("id-ID");


// Riwayat workflow

const {data:history,error:historyError}=await supabaseClient
.from("workflow_history")
.select("*")
.eq("berkas_id",id)
.order("created_at",{ascending:true});


if(historyError){
 console.error(historyError);
 return;
}


document.getElementById("history").innerHTML =
history.map((item,index)=>`

<div class="timeline-item">

<div class="dot">
${index===history.length-1 ? "●":"✓"}
</div>

<div class="content">

<strong>${item.tahap}</strong>

<p>
${item.catatan || "Proses berjalan"}
</p>

<small>
${item.created_at ?
new Date(item.created_at).toLocaleString("id-ID")
:""}
</small>

</div>

</div>

`).join("");


}


loadDetail();
