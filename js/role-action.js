
function tampilkanAksiRole(berkasId, posisi){

const user = JSON.parse(localStorage.getItem("user"));

const box=document.getElementById("workflow-action");

if(!box || !user) return;


let tombol="";


if(user.role==="pelaksana" && posisi==="Pelaksana"){

tombol=`
<button onclick="jalankanAksiWorkflow(
'${berkasId}',
'Disposisi Kasi Pelayanan',
'Selesai pemeriksaan awal'
)">
Selesaikan Pemeriksaan
</button>
`;

}


if(user.role==="kasi_pelayanan" && posisi==="Disposisi Kasi Pelayanan"){

tombol=`
<button onclick="jalankanAksiWorkflow(
'${berkasId}',
'Penyuluh Pajak',
'Diteruskan ke Penyuluh'
)">
Disposisikan Penyuluh
</button>
`;

}


if(user.role==="penyuluh" && posisi==="Penyuluh Pajak"){

tombol=`
<button onclick="jalankanAksiWorkflow(
'${berkasId}',
'Approval Kepala Seksi',
'Penelitian selesai'
)">
Selesai Penelitian
</button>
`;

}


if(user.role==="kasi" && posisi==="Approval Kepala Seksi"){

tombol=`
<button onclick="jalankanAksiWorkflow(
'${berkasId}',
'Approval Kepala Kantor',
'Disetujui Kepala Seksi'
)">
Approve
</button>
`;

}


if(user.role==="kepala_kantor" && posisi==="Approval Kepala Kantor"){

tombol=`
<button onclick="jalankanAksiWorkflow(
'${berkasId}',
'Arsip',
'Selesai final'
)">
Setujui Final
</button>
`;

}


box.innerHTML=tombol || 
"<p>Tidak ada aksi untuk role ini</p>";

}
