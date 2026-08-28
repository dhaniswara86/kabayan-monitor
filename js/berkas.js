const container = document.getElementById("listBerkas");

let semuaBerkas = [];


function formatTanggal(tanggal){

    const d = new Date(tanggal);

    return d.toLocaleDateString(
        "id-ID",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

}



function iconWorkflow(posisi){

    const map={

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

    const hari =
    Math.ceil(
        (new Date(tanggal)-new Date())
        /(1000*60*60*24)
    );


    if(hari < 0)
        return `<span class="danger">
        🔴 Terlambat ${Math.abs(hari)} hari
        </span>`;


    if(hari <=7)
        return `<span class="warning">
        🟠 ${hari} hari
        </span>`;


    return `<span class="safe">
    🟢 Aman
    </span>`;

}



function tampilkanBerkas(data){


    container.innerHTML="";


    data.forEach(item=>{


        container.innerHTML += `

        <div class="card"
        onclick="
        location.href='detail-berkas.html?id=${item.id}'
        ">


        <span class="tag">
        ${item.jenis_permohonan}
        </span>


        <h2>
        ${item.nama_perusahaan}
        </h2>


        <p class="case">
        ${item.nomor_kasus}
        </p>



        <div class="position">

        <span>
        Tahap Saat Ini
        </span>

        <strong>
        ${iconWorkflow(item.posisi)}
        ${item.posisi}
        </strong>

        </div>



        <div class="progress-title">

        <span>
        Progress Penyelesaian
        </span>

        <strong>
        ${item.progress}%
        </strong>

        </div>



        <div class="progress">

        <div style="
        width:${item.progress}%">
        </div>

        </div>



        <div class="deadline">

        <span>
        Deadline
        </span>

        <strong>
        ${formatTanggal(item.jatuh_tempo)}
        </strong>


        ${statusDeadline(item.jatuh_tempo)}

        </div>


        </div>

        `;

    });

}




function aktifkanFilter(){


    const tombol =
    document.querySelectorAll(".filter button");


    tombol.forEach(btn=>{


        btn.onclick=function(){


            tombol.forEach(b=>
                b.classList.remove("active")
            );


            this.classList.add("active");



            const filter=this.innerText;



            if(filter==="Semua"){

                tampilkanBerkas(semuaBerkas);

                return;

            }



            let posisi="";


            if(filter==="Pelaksana")
                posisi="Pelaksana";


            if(filter==="Disposisi Kasi")
                posisi="Disposisi Kasi Pelayanan";


            if(filter==="Penyuluh")
                posisi="Penyuluh Pajak";


            if(filter==="Approval Kasi")
                posisi="Approval Kepala Seksi";


            if(filter==="Approval Kepala Kantor")
                posisi="Approval Kepala Kantor";


            if(filter==="Arsip")
                posisi="Arsip";



            tampilkanBerkas(
                semuaBerkas.filter(
                    x=>x.posisi===posisi
                )
            );


        };


    });

}




async function loadBerkas(){


    const {data,error}=

    await supabaseClient
    .from("berkas")
    .select("*")
    .order("created_at",
    {
        ascending:false
    });



    if(error){

        console.error(error);

        return;

    }


    semuaBerkas=data;


    tampilkanBerkas(data);


    aktifkanFilter();

}


loadBerkas();
