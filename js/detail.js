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

console.log("JUMLAH HISTORY:", history.length);
console.log(history);

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
        history.map((item,index)=>{


        let icon="○";


        // otomatis berdasarkan urutan jika status kosong

        if(index < history.length-1){

            icon="✓";

        }
        else{

            icon="●";

        }



        return `


        <div class="step">


            <div class="circle">
                ${icon}
            </div>


            <div>

                <b>
                ${item.tahap}
                </b>


                <small>
                ${item.catatan ?? "Menunggu proses"}
                </small>


                <small>
                ${formatTanggal(item.created_at)}
                </small>


            </div>


        </div>


        `;


        }).join("")
    }


    </div>


    `;



}



loadDetail();
