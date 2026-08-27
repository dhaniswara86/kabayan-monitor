
const defaultData=[
{
id:"001",
nomorKasus:"C0014822877",
perusahaan:"PANFILA INDOSARI",
jenis:"PYSTT",
posisi:"Penyuluh Pajak",
jatuhTempo:"2026-09-02",
workflow:[
{tahap:"Pelaksana",status:"selesai"},
{tahap:"Disposisi Kasi Pelayanan",status:"selesai"},
{tahap:"Penyuluh Pajak",status:"aktif"},
{tahap:"Approval Kepala Seksi",status:"menunggu"},
{tahap:"Approval Kepala Kantor",status:"menunggu"},
{tahap:"Arsip",status:"menunggu"}
],
history:[
{tanggal:"29 Agustus 2026",user:"Faris Yustian",aksi:"Analisis berkas dimulai"}
]
}
];

const daftarBerkas=JSON.parse(localStorage.getItem("kabayanData"))||defaultData;
