const username = document.querySelector('#username'),
      email = document.querySelector('#email'),
      JambRegNumber = document.querySelector('#JambRegNumber'),
      MatricNumber = document.querySelector('#MatricNumber'),
      Name = document.querySelector('#Fullname')
      password = document.querySelector('#password'),
      password2 = document.querySelector('#password2'),
      buttonBtn = document.querySelector('#submitBtn'),
      JambErrorMsg = document.querySelector('#JambErrorMessage'),
      emailErrorMsg = document.querySelector('#emailErrorMessage'),
      MarticErrorMessage = document.querySelector('#MarticErrorMessage'),
      passwordErrorMsg = document.querySelector('#passwordErrorMessage'),
      NameErrorMsg = document.querySelector('#NameErrorMessage'),
      alert = document.querySelector('.Success_Alert')
      emailPattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
      baseURL = "http://localhost:305/";



              // Function to trigger the animation
              function animateBox() {
                alert.classList.toggle('activeAlert');  

                setTimeout(function() {
                  window.location.href = "./login.html"
                  }, 4000);
              }

              
      
  


buttonBtn.addEventListener('click', async (e) => {
    // const role = check()
    e.preventDefault();

if (
  matricValidation() &&
    JambRegNumberValidation() &&
    emailValidation() &&
    passwordValidation() &&
    NameValidation()
   
  ) {
    let userData = {
      email: email.value.trim().toLowerCase(),
      matric_number: MatricNumber.value.trim(),
      jamb_number: JambRegNumber.value.trim(),
      password: password.value,
      names: Name.value.trim()
    };
    console.log(Name.value);
    console.log(userData);
    
    
    postData(`${baseURL}register`, userData);
  }


  function NameValidation(){
    if (Name.value === '') {
      NameErrorMsg.innerText = 'Please enter your Full Name';
        Name.classList.add('error');
    }   else if (Name.value.trim().length < 5) {
      NameErrorMsg.innerText = 'Full Name must be at least 5 characters';
       Name.classList.add('error');
    }   else {
      NameErrorMsg.innerText = '';
        return true;
    }
}
Name.addEventListener("input", NameValidation);

function matricValidation(){
    if (MatricNumber.value === '') {
      MarticErrorMessage.innerText = 'Please enter your username';
      MatricNumber.classList.add('error');
    }   else if (MatricNumber.value.trim().length < 7) {
      MarticErrorMessage.innerText = 'Matric Number must be at least 7 characters';
      MatricNumber.classList.add('error');
    }   else if (MatricNumber.value.charAt(0).toUpperCase() !== 'U') {
      console.log(MatricNumber.value.charAt(0));
      
      MarticErrorMessage.innerText = 'Enter a valid Matric Number';
      MatricNumber.classList.add('error');
    }   else {
      MarticErrorMessage.innerText = '';
        return true;
    }
}
function JambRegNumberValidation(){
    if (JambRegNumber.value === '') {
      JambErrorMsg.innerText = 'Please enter your Jamb Reg Number';
        JambRegNumber.classList.add('error');
    }   else if (JambRegNumber.value.trim().length < 8) {
      JambErrorMsg.innerText = 'Name must be at least 8 characters';
        JambRegNumber.classList.add('error');
    }   else {
      JambErrorMsg.innerText = '';
        return true;
    }
}
JambRegNumber.addEventListener("input", JambRegNumberValidation);


function emailValidation(){
    if (email.value === '') {
        emailErrorMsg.innerText = 'Please enter your email';
        email.classList.add('error');
    }   else if (email.value.trim().length < 3) {
        emailErrorMsg.innerText = 'Name must be at least 3 characters';
        email.classList.add('error');
    }       else if (!email.value.match(emailPattern)){
        emailErrorMsg.innerText = "Please enter a valid email.";
        emailErrorMsg.classList.add('error');
    }   else {
        emailErrorMsg.innerText = '';
        return true;
    }
}
email.addEventListener("input", emailValidation);


function passwordValidation(){
    if (password.value === '') {
        passwordErrorMsg.innerText = 'Please enter your Password'
        password.classList.add('error');
    }   else if (password.value.trim().length < 8) {
        passwordErrorMsg.innerText = 'Password must be at least 8 characters';
    }   else if (!password.value.match(passwordPattern)){
        passwordErrorMsg.innerText = "Please enter at least 8 character with number, symbol, small and capital letter.";
        passwordErrorMsg.classList.add('error');
    }   else {
        passwordErrorMsg.innerText = '';
        return true;
    }
}

password.addEventListener("input", passwordValidation);

// function confirmPasswordValidation(){
//     if  (password2.value !== password.value) {
//         password2ErrorMsg.innerText = "Passwords don't match";
//         password2ErrorMsg.classList.add('error')
//     }   else {
//         password2ErrorMsg.innerText = '';
//         return true
//     }
// }

// password2.addEventListener("input", confirmPasswordValidation);
      

async function postData(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });



      const bodydata = await res.json();
      console.log(bodydata);

      if (bodydata.message == "Success") {
        animateBox()
        
        JambRegNumber.value ="",
        email.value = "";
        password.value = "";
        password2.value = "";
        console.log("Success");

        // window.location.href = "./login.html"
        

      }
      if (bodydata.message == "Email already Exists") {
        emailErrorMsg.innerText = "Email already exists.";
        emailErrorMsg.classList.add('error');


      } else if (bodydata.message == "Matric number already exists") {
        MarticErrorMessage .innerText = "Matric number already exists.";
        MarticErrorMessage.classList.add('error');

      } else if (bodydata.message == "Jamb Reg Number already Exists") {
        JambErrorMsg.innerText = "Jamb Reg Number already Exists.";
        JambErrorMsg.classList.add('error');
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

}
)






