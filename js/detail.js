
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


document.getElementById("nama").innerHTML = berkas.nama_perusahaan;
document.getElementById("nomor").innerHTML = berkas.nomor_kasus;
document.getElementById("jenis").innerHTML = berkas.jenis_permohonan || "-";
document.getElementById("posisi").innerHTML = berkas.posisi || "-";
document.getElementById("progress").innerHTML = `${berkas.progress || 0}% selesai`;
document.getElementById("deadline").innerHTML =
new Date(berkas.jatuh_tempo).toLocaleDateString("id-ID");


// workflow history

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

<p>${item.catatan || "Proses berjalan"}</p>

<small>
${item.created_at ?
new Date(item.created_at).toLocaleString("id-ID")
:""}
</small>

</div>

</div>

`).join("");


// tampilkan aksi sesuai role

const user = JSON.parse(localStorage.getItem("user"));

const actionBox = document.getElementById("workflow-action");

if(user && actionBox){

let html="";

switch(user.role){

case "admin":
html=`
<h3>Update Workflow</h3>
<select id="tahap">
<option>Pelaksana</option>
<option>Disposisi Kasi Pelayanan</option>
<option>Penyuluh Pajak</option>
<option>Approval Kepala Seksi</option>
<option>Approval Kepala Kantor</option>
<option>Arsip</option>
</select>
<textarea id="catatan" placeholder="Catatan"></textarea>
<button onclick="updateWorkflow('${id}')">Simpan</button>
`;
break;


case "pelaksana":
html=`<button onclick="updateWorkflow('${id}')">Selesaikan Pemeriksaan Awal</button>`;
break;


case "kasi_pelayanan":
html=`<button onclick="updateWorkflow('${id}')">Disposisikan ke Penyuluh</button>`;
break;


case "penyuluh":
html=`<button onclick="updateWorkflow('${id}')">Selesaikan Penelitian</button>`;
break;


case "kasi":
html=`<button onclick="updateWorkflow('${id}')">Approve Kepala Seksi</button>`;
break;


case "kepala_kantor":
html=`<button onclick="updateWorkflow('${id}')">Approve Final</button>`;
break;

}


actionBox.innerHTML=html;

}

}


loadDetail();
