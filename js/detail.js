const params = new URLSearchParams(window.location.search);

const id = params.get("id");



function formatTanggal(tanggal){

    if(!tanggal) return "-";

    return new Date(tanggal)
    .toLocaleDateString("id-ID",
    {
        day:"numeric",
        month:"long",
        year:"numeric"
    });

}




async function loadDetail(){


    // ambil data utama

    const {data:berkas,error:errorBerkas}=

    await supabaseClient

    .from("berkas")

    .select("*")

    .eq("id",id)

    .single();



    if(errorBerkas){

        console.error(errorBerkas);

        return;

    }





    // ambil histori workflow

    const {data:history,error:errorHistory}=

    await supabaseClient

    .from("workflow_history")

    .select("*")

    .eq("berkas_id",id)

    .order("created_at");



    if(errorHistory){

        console.error(errorHistory);

        return;

    }




    document.querySelector(".app").innerHTML = `


    <div class="brand">
        Kabayan Monitor
    </div>



    <h1>
    ${berkas.nama_perusahaan}
    </h1>



    <p>
    Nomor Kasus:
    <b>${berkas.nomor_kasus}</b>
    </p>



    <p>
    Jenis Permohonan:
    <b>${berkas.jenis_permohonan}</b>
    </p>



    <div class="info-box">

        <span>Posisi Saat Ini</span>

        <strong>
        🔵 ${berkas.posisi}
        </strong>

    </div>



    <div class="progress">

        <div style="width:${berkas.progress}%">

        </div>

    </div>



    <h3>
    ${berkas.progress}% selesai
    </h3>



    <p>
    Deadline:
    <b>${formatTanggal(berkas.jatuh_tempo)}</b>
    </p>



    <div class="workflow">

    <h2>
    Riwayat Penyelesaian
    </h2>


    ${
        history.map(item=>{


        let icon="○";


        if(item.status==="selesai")
            icon="✓";


        if(item.status==="proses")
            icon="●";



        return `

        <div class="step">

        ${icon}
        ${item.tahap}

        <small>
        ${item.catatan ?? ""}
        </small>

        </div>


        `;


        }).join("")
    }


    </div>


    `;



}



loadDetail();
