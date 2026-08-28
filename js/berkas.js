const container = document.getElementById("listBerkas");

function formatTanggal(tanggal){
    const d = new Date(tanggal);
    return d.toLocaleDateString("id-ID", {
        day:"numeric",
        month:"long",
        year:"numeric"
    });
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
    const hari = Math.ceil((new Date(tanggal)-new Date())/(1000*60*60*24));

    if(hari < 0)
        return `<span class="danger">🔴 Terlambat ${Math.abs(hari)} hari</span>`;

    if(hari <= 3)
        return `<span class="danger">🔴 Kritis • ${hari} hari</span>`;

    if(hari <= 7)
        return `<span class="warning">🟠 Perhatian • ${hari} hari</span>`;

    return `<span class="safe">🟢 Aman • ${hari} hari</span>`;
}

async function loadBerkas(){

    const {data,error}=await supabaseClient
        .from("berkas")
        .select("*")
        .order("created_at",{ascending:false});

    if(error){
        console.error(error);
        return;
    }

    container.innerHTML="";

    data.forEach(item=>{

        container.innerHTML += `
        <div class="card"
        onclick="location.href='detail-berkas.html?id=${item.id}'">

        <span class="tag">${item.jenis_permohonan}</span>

        <h2>${item.nama_perusahaan}</h2>

        <p class="case">${item.nomor_kasus}</p>

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
        <strong>${formatTanggal(item.jatuh_tempo)}</strong>
        ${statusDeadline(item.jatuh_tempo)}
        </div>

        </div>`;
    });
}

loadBerkas();
