// Password show and hide
const eyeIcons = document.querySelectorAll('.eye-icon');

eyeIcons.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", () => {
        const password_fields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        password_fields.forEach(password => {
            if(password.type == "password"){
                password.type = "text";
                eyeIcon.classList.replace('bx-show', 'bx-hide');
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace('bx-hide', 'bx-show');
        })
    })
})

// Switch between login and signup forms
const showSignUp = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");

showSignUp.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById('login-form').style.display = "none";
    document.getElementById('signup-form').style.display = "block";
})
showLogin.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById('login-form').style.display = "block";
    document.getElementById('signup-form').style.display = "none";
})


// Login Request
document.addEventListener('DOMContentLoaded', () =>{
    
const login = document.getElementById('login');

login.addEventListener("click", async(e) => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    
    if(username=="" | password==""){
        document.getElementById('login-err-msg').innerHTML = "Please fill out the fields";
    }
    else{
        if(username){
            localStorage.setItem('currentUser', username);
        }
        document.getElementById('login-err-msg').innerHTML = "";
        document.getElementById('fa-spinner').style.display = "inline-block"; //enables spinner in login btn

        try{
            var response = await axios.post('https://ameen2210.pythonanywhere.com/login/',{username, password});
            var is_active = response.data.user_object.is_active;
            var is_superuser = response.data.user_object.is_superuser;
            var is_staff = response.data.user_object.is_staff;
            console.log({username,password});
            console.log(response);
        }
        catch(error){
            console.log(error);
        }

        if(response.data.result=="success"){
            // document.getElementById('loading').style.display = "flex";
            // setTimeout(() => {

                if(is_active && is_superuser){
                    window.location.href = "HTML/Home.html";
                }
                else if(is_active && is_staff){
                    window.location.href = "HTML/AddTuitionFees.html";
                }
            // }, 4000);
        }
 
        else{
            document.getElementById('fa-spinner').style.display = "none"; // disables spinner in login btn
            document.getElementById('login-err-msg').innerHTML = `Incorrect username or password <br> Try Again`;
        }
    }
    
})
})
// Signup request
const signup = document.getElementById('signup');
signup.addEventListener("click", async(e) => {
    e.preventDefault();
    const newUsername = document.getElementById('new-username').value;
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;
    const repeatPassword = document.getElementById('repeat-password').value;

    const data = {
        newUsername : newUsername,
        email : email,
        newPassword : newPassword,
    }
    let errmsg = document.getElementById('signup-err-msg');
    if(newUsername == "" | email == "" | newPassword == "" | repeatPassword == ""){
        errmsg.innerHTML = "Please fill out the fields";
    }
    else if(newPassword!=repeatPassword){
        errmsg.innerHTML = "Passwords are not matching";
    }
    else if(!/[a-z]/.test(newPassword)){
        errmsg.innerHTML = "Password must contain atleast one lowercase letter";
    }
    else if(!/\d/.test(newPassword)){
        errmsg.innerHTML = "Password must contain atleast one digit";
    }
    else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword)) {
        errmsg.innerHTML = "Password must contain at least one special character.";
    }
    else if(newPassword.length < 8){
        errmsg.innerHTML = "Password must be atleast 8 characters long";
    }
    else{
        errmsg.innerHTML = "";
        try{
            console.log(data);
            const response = await axios.post("...", data);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
    }  
})
// let newPassword = document.getElementById('new-password').value,
//  repeatPassword = document.getElementById('repeat-password').value;
 

