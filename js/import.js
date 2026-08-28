let rows=[];
let valid=[];
let errors=[];
let duplicate=[];


async function validateExcel(){

rows=[];
valid=[];
errors=[];
duplicate=[];

const file=document.getElementById('file').files[0];

if(!file)return alert('Pilih file');

const buffer=await file.arrayBuffer();

const workbook=XLSX.read(buffer);
const sheet=workbook.Sheets[workbook.SheetNames[0]];

rows=XLSX.utils.sheet_to_json(sheet);


// Ambil nomor kasus yang sudah ada
const {data:existing=[]}=await supabase
.from('berkas')
.select('nomor_kasus');


const existingNo=new Set(
existing.map(x=>x.nomor_kasus)
);


rows.forEach((r,i)=>{

let err=[];

if(!r.nomor_kasus)
err.push('Nomor kasus kosong');

if(!r.nama_perusahaan)
err.push('Nama perusahaan kosong');


if(existingNo.has(r.nomor_kasus)){
duplicate.push({
row:i+2,
nomor:r.nomor_kasus
});
}


if(err.length){
errors.push({
row:i+2,
text:err.join(', ')
});
}else{
valid.push(r);
}

});


document.getElementById('valid').innerText=valid.length;
document.getElementById('error').innerText=errors.length;
document.getElementById('duplicate').innerText=duplicate.length;

document.getElementById('error-list').innerHTML=
[...errors,...duplicate].map(x=>
`<p class="error">Baris ${x.row}: ${x.text||'Nomor kasus sudah ada'}</p>`
).join('');

document.getElementById('result').classList.remove('hidden');

}


async function importData(){

const mode=document.querySelector(
'input[name=mode]:checked'
).value;


if(mode==='insert'){

const data=valid.map(r=>({
nomor_kasus:r.nomor_kasus,
nama_perusahaan:r.nama_perusahaan,
jenis_permohonan:r.jenis_permohonan,
posisi:r.posisi,
status:r.status||'Dalam Proses',
progress:Number(r.progress||0),
jatuh_tempo:r.jatuh_tempo
}));


const {data:inserted,error}=await supabase
.from('berkas')
.insert(data)
.select();


if(error)return alert(error.message);


const history=inserted.map(x=>({
berkas_id:x.id,
tahap:x.posisi,
aksi:'Import Excel',
status:'Selesai'
}));

await supabase.from('workflow_history').insert(history);

alert('Import berhasil');

}

}
