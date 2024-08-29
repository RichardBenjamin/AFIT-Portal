// const { get } = require("../../Backend/Backend/routes/register");

const username = document.querySelector('#username'),
      email = document.querySelector('#email'),
      password = document.querySelector('#password'),
      password2 = document.querySelector('#password2'),
      buttonBtn = document.querySelector('#submitBtn'),
      checkBox = document.querySelectorAll('.radioBtn'),
      usernameErrorMsg = document.querySelector('#usernameErrorMessage'),
      emailErrorMsg = document.querySelector('#emailErrorMessage'),
      UpdatePasswordBtn = document.querySelector('#UpdatePasswordBtn'),
      passwordErrorMessage1 = document.querySelector('#passwordErrorMessage'),
      passwordErrorMessage2 = document.querySelector('#password2ErrorMessage'),
      emailPattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      baseURL = "http://localhost:305/";




// buttonBtn.addEventListener('click', async (e) => {
//     e.preventDefault();

// if (
//     passwordValidation1() &&
//     passwordValidation2()
   
//   ) {
//     alert(password1.value)
//     console.log(password1.value);
//     console.log(password2.value);

//   }


// }
// )


const password1 = document.querySelector('#password1')
// const password2 = document.querySelector('#password2')
function passwordValidation1(){
    if (password1.value === '') {
		passwordErrorMessage1.innerText = 'Please enter your Password'
        password1.classList.add('error');
    }   else if (password1.value.trim().length < 8) {
		passwordErrorMessage1.innerText = 'Password must be at least 8 characters';
    }   else if (!password1.value.match(passwordPattern)){
		passwordErrorMessage1.innerText = "Please enter at least 8 character with number, symbol, small and capital letter.";
        passwordErrorMessage1.classList.add('error');
    }   else {
		passwordErrorMessage1.innerText = '';
        return true;
    }
}

// password1.addEventListener("input", passwordValidation1);


// function passwordValidation2(){
//   if (password1.value === '') {
// 		passwordErrorMessage1.innerText = 'Please enter your Password'
//         password1.classList.add('error');
//     }   else if (password1.value.trim().length < 8) {
// 		passwordErrorMessage1.innerText = 'Password must be at least 8 characters';
//     }   else if (!password1.value.match(passwordPattern)){
// 		passwordErrorMessage1.innerText = "Please enter at least 8 character with number, symbol, small and capital letter.";
//         passwordErrorMessage1.classList.add('error');
//     }   else {
// 		passwordErrorMessage1.innerText = '';
//         return true;
//     }
// }



function passwordValidation2(){
  if  (password2.value !== password1.value) {
  passwordErrorMessage2.innerText = "Passwords don't match";
      passwordErrorMessage2.classList.add('error')
  }   else {
      passwordErrorMessage2.innerText = '';
      return true
  }
}


async function updatePasswordForm(){
  const password1 = document.querySelector('#password1')
  const password2 = document.querySelector('#password2')

    if (
      passwordValidation1()&&
      passwordValidation2()
      // confirmPasswordValidation()
    ) 
    {
      let userData = {
      password: password1.value.trim(),
      password2: password2.value.trim(),
      };

      id = localStorage.getItem('id')

      updatePassword(`http://localhost:305/register/changepassword/${id}`, userData);
    }
}


// UpdatePasswordBtn.addEventListener('click', (e)=>{
//               console.log("password");
//   e.preventDefault()
//   updatePasswordForm()
// })

UpdatePasswordBtn.addEventListener('click', async (e) => {
    e.preventDefault();

// UpdatePasswordBtn.addEventListener('click', (e)=>{
              console.log("password");
  // e.preventDefault()
  updatePasswordForm()
})



async function updatePassword(url, data) {
  try {
    const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });

    const bodydata = await res.json();
    console.log(bodydata);
  
    if (bodydata.message == "Success") {
       window.location.href = "../HTMLS/login.html"
    }
    
  
    if (bodydata.message == "Invalid") {
    console.log("invalid password");
    passwordErrorMessage1.innerText = "Enter your correct password"
    }
    
  } catch (err) {
    console.error(`Error: ${err}`);
    }
  }


  









