
function lanjutkanWorkflow(id){
const data = daftarBerkas.find(item=>item.id===id);
if(!data) return;

const aktif = data.workflow.findIndex(x=>x.status==="aktif");
if(aktif < 0) return;

data.workflow[aktif].status="selesai";

if(data.workflow[aktif+1]){
 data.workflow[aktif+1].status="aktif";
 data.posisi=data.workflow[aktif+1].tahap;
}

data.history.unshift({
 tanggal:"28 Agustus 2026",
 user:currentUser.nama,
 aksi:"Memindahkan berkas ke " + data.posisi
});

localStorage.setItem("kabayanData", JSON.stringify(daftarBerkas));
location.reload();
}
