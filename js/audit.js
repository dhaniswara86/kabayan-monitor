
async function loadAudit(){

const container=document.getElementById("timeline");


const {data,error}=await supabaseClient
.from("workflow_history")
.select(`
    *,
    berkas:berkas_id(
        nama_perusahaan,
        nomor_kasus
    )
`)
.order("created_at",{ascending:false});


if(error){

console.error(error);
container.innerHTML="Gagal mengambil histori";
return;

}



container.innerHTML=data.map(item=>`

<div class="audit-card">

<div class="time">
${new Date(item.created_at).toLocaleString("id-ID")}
</div>


<h3>
${item.berkas?.nama_perusahaan || "-"}
</h3>


<p>
Nomor Kasus:
<strong>
${item.berkas?.nomor_kasus || "-"}
</strong>
</p>


<p>
Tahap:
<strong>${item.tahap}</strong>
</p>


<p>
Aksi:
${item.aksi || "-"}
</p>


<p>
${item.catatan || ""}
</p>


</div>

`).join("");

}


loadAudit();
