async function testDatabase(){

const hasil = await supabaseClient
.from("berkas")
.select("*");

console.log("HASIL DATA:", hasil.data);
console.log("ERROR:", hasil.error);

}

testDatabase();
