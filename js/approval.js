function prosesApproval(id, keputusan, catatan=""){

const data = daftarBerkas.find(x=>x.id===id);

if(!data) return;


const aktif = data.workflow.find(
x=>x.status==="aktif"
);


if(!aktif) return;


if(keputusan==="approve"){

aktif.status="selesai";


const index=data.workflow.indexOf(aktif);

if(data.workflow[index+1]){
    data.workflow[index+1].status="aktif";
    data.posisi=data.workflow[index+1].tahap;
}

data.history.unshift({
tanggal:"28 Agustus 2026",
user:currentUser.nama,
aksi:"Menyetujui berkas dan meneruskan proses"
});


}


if(keputusan==="return"){

aktif.status="revisi";

data.posisi="Penyuluh Pajak";


data.history.unshift({
tanggal:"28 Agustus 2026",
user:currentUser.nama,
aksi:"Mengembalikan berkas untuk revisi",
catatan:catatan
});

}


if(keputusan==="reject"){

data.status="Ditolak";

data.history.unshift({
tanggal:"28 Agustus 2026",
user:currentUser.nama,
aksi:"Menolak berkas",
catatan:catatan
});

}


localStorage.setItem(
"kabayanData",
JSON.stringify(daftarBerkas)
);

location.reload();

}