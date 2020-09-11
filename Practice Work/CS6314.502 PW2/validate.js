// Name: Aditya Viswanatham.
// NetID: arv160730.
// CS 6314.502 Practice Work 2.

window.onload = function(){

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input element 
	// they are initially hidden

    let usernameSpan = document.createElement("span");
    usernameSpan.style.display = "none";

    // Username Validation.
    let username = document.getElementById("username");
    username.parentNode.appendChild(usernameSpan);
    const validateUsername = () => {
        const regex = /^[a-z0-9]+$/i;
        if (username.value) {
            if (regex.test(username.value)) {
                usernameSpan.className = "ok";
                usernameSpan.textContent = "OK";
            }
            else {
                usernameSpan.className = "error";
                usernameSpan.textContent = "Error";
            }
            usernameSpan.style.display = 'block';
        }
    }

    let passwordSpan = document.createElement("span");
    passwordSpan.style.display = "none";

    // Password Validation.
    let password = document.getElementById("password");
    password.parentNode.appendChild(passwordSpan);
    const validatePassword = () => {
        if (password.value) {
            if (password.value.length >= 6) {
                passwordSpan.className = "ok";
                passwordSpan.textContent = "OK";
            }
            else {
                passwordSpan.className = "error";
                passwordSpan.textContent = "Error";
            }
            passwordSpan.style.display = 'block';
        }
    }

    let emailSpan = document.createElement("span");
    emailSpan.style.display = "none";

    // Email Validation.
    let email = document.getElementById("email");
    email.parentNode.appendChild(emailSpan);
    const validateEmail = () => {
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (email.value) {
            if (regex.test(email.value)) {
                emailSpan.className = "ok";
                emailSpan.textContent = "OK";
            }
            else {
                emailSpan.className = "error";
                emailSpan.textContent = "Error";
            }
            emailSpan.style.display = 'block';
        }
    }

    username.onfocus = function(){
        usernameSpan.style.display = "block";
        usernameSpan.className = "info";
        usernameSpan.textContent = "Username can only contain alphanumeric characters.";
    }

    username.onblur = function(){
        usernameSpan.style.display = "none";
        validateUsername();
    }

    password.onfocus = function() {
        passwordSpan.style.display = "block";
        passwordSpan.className = "info";
        passwordSpan.textContent = "Password should include atleast six characters.";
    }

    password.onblur = function() {
        passwordSpan.style.display = "none";
        validatePassword();
    }

    email.onfocus = function() {
        emailSpan.style.display = "block";
        emailSpan.className = "info";
        emailSpan.textContent = "Please enter a valid email. Format: abc@xyz.com";
    }

    email.onblur = function() {
        emailSpan.style.display = "none";
        validateEmail();
    }
}
