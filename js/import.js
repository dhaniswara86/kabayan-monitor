let rows=[];

async function previewExcel(){
const file=document.getElementById('file').files[0];
if(!file)return;

const buffer=await file.arrayBuffer();
const workbook=XLSX.read(buffer);
const sheet=workbook.Sheets[workbook.SheetNames[0]];

rows=XLSX.utils.sheet_to_json(sheet);

document.getElementById('preview').innerHTML=`
<table>
<tr>
<th>Nomor</th>
<th>Perusahaan</th>
<th>Posisi</th>
</tr>
${rows.slice(0,10).map(r=>`
<tr>
<td>${r.nomor_kasus||''}</td>
<td>${r.nama_perusahaan||''}</td>
<td>${r.posisi||''}</td>
</tr>`).join('')}
</table>`;

document.getElementById('previewBox').classList.remove('hidden');
}


async function importData(){

const data=rows.map(r=>({
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

if(error){
document.getElementById('message').innerText=error.message;
return;
}

const history=inserted.map(x=>({
berkas_id:x.id,
tahap:x.posisi,
aksi:'Import Data Excel',
status:'Selesai'
}));

await supabase.from('workflow_history').insert(history);

document.getElementById('message').innerText=
'Data berhasil diimport '+inserted.length+' berkas';
}
