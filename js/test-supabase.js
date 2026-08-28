async function testDatabase(){

const {data,error} =
await supabaseClient
.from("berkas")
.select("*");


console.log(data);


if(error){

console.error(error);

}

}

testDatabase();
