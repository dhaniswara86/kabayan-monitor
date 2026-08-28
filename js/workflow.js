
async function updateWorkflow(berkasId){

const tahap = document.getElementById("tahap").value;
const catatan = document.getElementById("catatan").value;


const progressMap = {

"Pelaksana":10,
"Disposisi Kasi Pelayanan":25,
"Penyuluh Pajak":50,
"Approval Kepala Seksi":75,
"Approval Kepala Kantor":90,
"Arsip":100

};


const progress = progressMap[tahap];



const {data:berkas,error:errorBerkas}=await supabaseClient
.from("berkas")
.select("*")
.eq("id",berkasId)
.single();


if(errorBerkas){
console.error(errorBerkas);
return;
}


// update posisi berkas

const {error:updateError}=await supabaseClient
.from("berkas")
.update({

posisi:tahap,
progress:progress

})
.eq("id",berkasId);



if(updateError){
console.error(updateError);
return;
}



// tambah history

const {error:historyError}=await supabaseClient
.from("workflow_history")
.insert({

berkas_id:berkasId,
tahap:tahap,
catatan:catatan || "Perubahan tahap workflow"

});


if(historyError){
console.error(historyError);
return;
}



alert("Workflow berhasil diperbarui");


location.reload();


}
