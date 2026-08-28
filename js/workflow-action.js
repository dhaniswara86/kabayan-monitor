
async function jalankanAksiWorkflow(
    berkasId,
    tahapTujuan,
    catatan
){

const user = JSON.parse(
    localStorage.getItem("user")
);


if(!user){
    alert("Sesi login tidak ditemukan");
    return;
}


// aturan perpindahan workflow

const alur = {

"Pelaksana":
{
    next:"Disposisi Kasi Pelayanan",
    roles:["pelaksana","admin"]
},

"Disposisi Kasi Pelayanan":
{
    next:"Penyuluh Pajak",
    roles:["kasi_pelayanan","admin"]
},

"Penyuluh Pajak":
{
    next:"Approval Kepala Seksi",
    roles:["penyuluh","admin"]
},

"Approval Kepala Seksi":
{
    next:"Approval Kepala Kantor",
    roles:["kasi","admin"]
},

"Approval Kepala Kantor":
{
    next:"Arsip",
    roles:["kepala_kantor","admin"]
}

};



// cek tahap tujuan

let tahapValid=false;

for(const tahap in alur){

    if(
        alur[tahap].next===tahapTujuan &&
        alur[tahap].roles.includes(user.role)
    ){

        tahapValid=true;

    }

}


if(!tahapValid){

    alert(
    "Anda tidak memiliki kewenangan melakukan aksi ini"
    );

    return;

}



const progressMap={

"Pelaksana":10,
"Disposisi Kasi Pelayanan":25,
"Penyuluh Pajak":50,
"Approval Kepala Seksi":75,
"Approval Kepala Kantor":90,
"Arsip":100

};



const {data:berkas,error:getError}=await supabaseClient
.from("berkas")
.select("*")
.eq("id",berkasId)
.single();



if(getError){

console.error(getError);
return;

}



// update berkas

const {error:updateError}=await supabaseClient
.from("berkas")
.update({

posisi:tahapTujuan,
progress:progressMap[tahapTujuan]

})
.eq("id",berkasId);



if(updateError){

console.error(updateError);
return;

}



// simpan audit trail

const {error:historyError}=await supabaseClient
.from("workflow_history")
.insert({

berkas_id:berkasId,
tahap:tahapTujuan,
catatan:
catatan ||
`Diproses oleh ${user.nama}`,

user_id:user.id

});



if(historyError){

console.error(historyError);
return;

}



alert("Workflow berhasil diperbarui");

location.reload();


}
