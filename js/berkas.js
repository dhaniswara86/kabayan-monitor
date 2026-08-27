const container = document.getElementById("listBerkas");

function hitungDeadline(tanggal){
    const hariIni = new Date("2026-08-27");
    const jatuhTempo = new Date(tanggal);

    const selisih = Math.ceil(
        (jatuhTempo - hariIni) / (1000*60*60*24)
    );

    if(selisih < 0){
        return `<span class="danger">🔴 Terlambat ${Math.abs(selisih)} hari</span>`;
    }

    if(selisih <= 3){
        return `<span class="danger">🔴 Kritis (${selisih} hari)</span>`;
    }

    if(selisih <= 7){
        return `<span class="warning">🟠 Perhatian (${selisih} hari)</span>`;
    }

    return `<span class="safe">🟢 Aman (${selisih} hari)</span>`;
}


daftarBerkas.forEach((item)=>{

container.innerHTML += `

<div class="card"
onclick="location.href='detail-berkas.html?id=${item.id}'">


<span class="tag">
${item.jenis}
</span>


<h2>${item.perusahaan}</h2>


<p>
Nomor Kasus:
<strong>${item.nomorKasus}</strong>
</p>


<div class="position">
Posisi Saat Ini

<strong>● ${item.posisi}</strong>
</div>


<div class="progress">
<div style="width:${item.progress}%"></div>
</div>

<p class="percent">
${item.progress}% selesai
</p>


<div class="deadline">
Deadline:
<br>
${item.jatuhTempo}

<br><br>

${hitungDeadline(item.jatuhTempo)}

</div>


</div>

`;

});