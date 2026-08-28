const user =
JSON.parse(
localStorage.getItem("user")
);



if(!user){

window.location.href="login.html";

}



console.log(
"LOGIN:",
user.nama,
"ROLE:",
user.role
);
