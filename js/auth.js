async function login(){


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



const {data,error}=

await supabaseClient.auth
.signInWithPassword({

email: email,

password: password

});



if(error){

document.getElementById("message")
.innerHTML =
error.message;

return;

}



const user = data.user;



const {data:profile,error:profileError}=

await supabaseClient

.from("profiles")

.select("*")

.eq("id", user.id)

.single();



if(profileError){

console.error(profileError);

document.getElementById("message")
.innerHTML =
"Profile pengguna belum dibuat";

return;

}



localStorage.setItem(
"user",
JSON.stringify(profile)
);



window.location.href=
"dashboard.html";


}
