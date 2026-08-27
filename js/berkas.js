const container = document.getElementById("listBerkas");

function formatTanggal(tanggal){
    const bulan = [
        "Januari","Februari","Maret","April",
        "Mei","Juni","Juli","Agustus",
        "September","Oktober","November","Desember"
    ];

    const d = new Date(tanggal);
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

function iconWorkflow(posisi){
    const map = {
        "Pelaksana":"📄",
        "Disposisi Kasi Pelayanan":"📌",
        "Penyuluh Pajak":"🔍",
        "Approval Kepala Seksi":"✓",
        "Approval Kepala Kantor":"✓",
        "Arsip":"📁"
    };
    return map[posisi] || "📄";
}

function statusDeadline(tanggal){

    const hariIni = new Date("2026-08-27");
    const deadline = new Date(tanggal);

    const hari = Math.ceil(
        (deadline-hariIni)/(1000*60*60*24)
    );

    if(hari < 0){
        return `<span class="danger">🔴 Terlambat ${Math.abs(hari)} hari</span>`;
    }

    if(hari <= 3){
        return `<span class="danger">🔴 Kritis • ${hari} hari</span>`;
    }

    if(hari <= 7){
        return `<span class="warning">🟠 Perhatian • ${hari} hari</span>`;
    }

    return `<span class="safe">🟢 Aman • ${hari} hari</span>`;
}


daftarBerkas.forEach(item=>{

container.innerHTML += `

<div class="card"
onclick="location.href='detail-berkas.html?id=${item.id}'">

<span class="tag">${item.jenis}</span>

<h2>${item.perusahaan}</h2>

<p class="case">
${item.nomorKasus}
</p>

<div class="position">
<span>Tahap Saat Ini</span>
<strong>${iconWorkflow(item.posisi)} ${item.posisi}</strong>
</div>

<div class="progress-title">
<span>Progress Penyelesaian</span>
<strong>${item.progress}%</strong>
</div>

<div class="progress">
<div style="width:${item.progress}%"></div>
</div>

<div class="deadline">
<span>Deadline</span>
<strong>${formatTanggal(item.jatuhTempo)}</strong>
${statusDeadline(item.jatuhTempo)}
</div>

</div>

`;

});