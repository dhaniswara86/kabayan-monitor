function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem("user")
    );

}



function getPosisiRole(role){

    const map = {

        pelaksana:
        "Pelaksana",

        kasi_pelayanan:
        "Disposisi Kasi Pelayanan",

        penyuluh:
        "Penyuluh Pajak",

        kasi:
        "Approval Kepala Seksi",

        kepala_kantor:
        "Approval Kepala Kantor"

    };


    return map[role];

}
