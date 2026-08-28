const params = new URLSearchParams(window.location.search);

const id = params.get("id");


const workflow = [
    "Pelaksana",
    "Disposisi Kasi Pelayanan",
    "Penyuluh Pajak",
    "Approval Kepala Seksi",
    "Approval Kepala Kantor",
    "Arsip"
];


function formatTanggal(tanggal){

    if(!tanggal) return "-";

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



async function loadDetail(){


    const {data,error}=await supabaseClient
        .from("berkas")
        .select("*")
        .eq("id",id)
        .single();



    if(error){

        console.error(error);

        return;

    }



    const posisiAktif =
        workflow.indexOf(data.posisi);



    document.querySelector(".app").innerHTML = `


    <div class="brand">
        Kabayan Monitor
    </div>



    <h1>${data.nama_perusahaan}</h1>



    <p>
    Nomor Kasus:
    <b>${data.nomor_kasus}</b>
    </p>



    <p>
    Jenis Permohonan:
    <b>${data.jenis_permohonan}</b>
    </p>




    <div class="info-box">

        <span>Posisi Saat Ini</span>

        <strong>
        🔵 ${data.posisi}
        </strong>

    </div>



    <div class="progress">

        <div 
        style="
        width:${data.progress}%
        ">
        </div>

    </div>



    <h3>
    ${data.progress}% selesai
    </h3>



    <p>
    Deadline:
    <b>
    ${formatTanggal(data.jatuh_tempo)}
    </b>
    </p>




    <div class="workflow">


    <h2>
    Alur Penyelesaian
    </h2>


    ${
    workflow.map((item,index)=>{


        let status="";


        if(index < posisiAktif){

            status="done";

        }

        else if(index===posisiAktif){

            status="active";

        }


        return `

        <div class="step ${status}">

        ${index<=posisiAktif?"●":"○"}

        ${item}

        </div>

        ${
        index < workflow.length-1
        ?
        '<div class="line"></div>'
        :
        ''
        }

        `;


    }).join("")
    }



    </div>



    `;


}



loadDetail();
