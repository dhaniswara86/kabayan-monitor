const params = new URLSearchParams(window.location.search);

const id = params.get("id");


async function loadDetail(){

    const {data,error} = await supabaseClient
        .from("berkas")
        .select("*")
        .eq("id", id)
        .single();


    if(error){
        console.error(error);
        return;
    }


    console.log(data);


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
    ${data.jenis_permohonan}
    </p>


    <div class="workflow">

        <h2>Progress Berkas</h2>


        <div class="step active">
        ● Pelaksana
        </div>

        <div class="line"></div>


        <div class="step">
        ● Disposisi Kasi Pelayanan
        </div>


        <div class="line"></div>


        <div class="step">
        ● Penyuluh Pajak
        </div>


        <div class="line"></div>


        <div class="step">
        ○ Approval Kepala Seksi
        </div>


        <div class="line"></div>


        <div class="step">
        ○ Approval Kepala Kantor
        </div>


        <div class="line"></div>


        <div class="step">
        ○ Arsip
        </div>


    </div>

    `;
}


loadDetail();
