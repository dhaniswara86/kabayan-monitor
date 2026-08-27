const container = document.getElementById("listBerkas");


daftarBerkas.forEach((item)=>{


container.innerHTML += `

<div class="card">


<span class="tag">
${item.jenis}
</span>


<h2>
${item.perusahaan}
</h2>


<p>
Nomor Kasus:
${item.nomorKasus}
</p>


<p>
Posisi:
<strong>${item.posisi}</strong>
</p>


<div class="progress">

<div style="
width:${item.progress}%
">
</div>

</div>


<p>
${item.progress}% selesai
</p>


<p>
Jatuh Tempo:
${item.jatuhTempo}
</p>


</div>


`;


});
