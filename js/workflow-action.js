
async function jalankanAksiWorkflow(berkasId, tahapTujuan, catatan){

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
 alert("User belum login");
 return;
}


// validasi role

const izin = {

"pelaksana":[
"Disposisi Kasi Pelayanan"
],

"kasi_pelayanan":[
"Penyuluh Pajak"
],

"penyuluh":[
"Approval Kepala Seksi"
],

"kasi":[
"Approval Kepala Kantor"
],

"kepala_kantor":[
"Arsip"
],

"admin":[
"Pelaksana",
"Disposisi Kasi Pelayanan",
"Penyuluh Pajak",
"Approval Kepala Seksi",
"Approval Kepala Kantor",
"Arsip"
]

};



if(!izin[user.role]?.includes(tahapTujuan)){

alert("Role Anda tidak memiliki kewenangan ke tahap ini");
return;

}



const progress = {

"Pelaksana":10,
"Disposisi Kasi Pelayanan":25,
"Penyuluh Pajak":50,
"Approval Kepala Seksi":75,
"Approval Kepala Kantor":90,
"Arsip":100

}[tahapTujuan];



const {error:updateError}=await supabaseClient
.from("berkas")
.update({

posisi:tahapTujuan,
progress:progress

})
.eq("id",berkasId);



if(updateError){

console.error(updateError);
alert("Gagal update berkas");
return;

}



const {error:historyError}=await supabaseClient
.from("workflow_history")
.insert({

berkas_id:berkasId,
tahap:tahapTujuan,
catatan:catatan || `Diproses oleh ${user.nama}`,
user_id:user.id

});



if(historyError){

console.error(historyError);
alert("Gagal membuat histori");
return;

}



alert("Workflow berhasil dipindahkan");

location.reload();

}
