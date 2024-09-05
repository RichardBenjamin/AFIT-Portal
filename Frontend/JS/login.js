const email = document.querySelector('#email'),
      password = document.querySelector('#password'),
      buttonBtn = document.querySelector('#submitBtn'),
      emailErrorMsg = document.querySelector('#emailErrorMessage'),
      passwordErrorMsg = document.querySelector('#passwordErrorMessage'),
      emailPattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      passwordPattern =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#()^$!%*?&]{8,}$/;
      matricPattern =   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#()^$!%*?&]{8,}$/;
      baseURL = "http://localhost:305/";





                        //------------------------------------- FUNCTION FOR BUTTON  ---------------------------//

                  buttonBtn.addEventListener('click', async (e) => {
                      console.log("checking");
                      e.preventDefault();

                  if (
                    isFirstCharacterU() &&
                      passwordValidation() 
                    
                    ) {
                      let userData = {
                        email: email.value.trim(),
                        password: password.value,
                      };
                      console.log(userData);
                      loginPost(`${baseURL}login`, userData);
                    }
                  })


                //           ------------------------------------- FUNCTION FOR EMAIL VALIDATION ---------------------------//


            
            function isFirstCharacterU() {
              if (email.value === '') {
                emailErrorMsg.innerText = 'Please enter a valid input';
                email.classList.add('error');
            }   else if (email.value.match(emailPattern)){
                emailErrorMsg.innerText = '';
                return true;
          } else if (email.value.charAt(0).toUpperCase() === 'U') {
                      emailErrorMsg.innerText = '';
                      return true;
            }   else {
              emailErrorMsg.innerText = '';
              return true;
            }
          }

          function checkEmail(){

          }






          //------------------------------------- FUNCTION FOR PASSWORD VALIDATION ---------------------------//

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



                  //--------------------------------- FUNCTION TO LOGIN----------------------------------// 


          async function loginPost(url, data) {
            try {
              const res = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });

              
              const bodydata = await res.json();
              console.log(bodydata.message);
              if (bodydata.message == "Invalid") {
                emailErrorMsg.innerText = 'Please enter your correct email or password';
              }

              if (bodydata.message == "logged") {
                localStorage.setItem("email", bodydata.email);
                localStorage.setItem("id", bodydata.id)
                localStorage.setItem("Matric_number", bodydata.Matric_number)
                localStorage.setItem("names", bodydata.name)
                localStorage.setItem("jambRegNumber", bodydata.jambRegNumber)

                console.log("ertyui");
                




                window.location.href = "../HTMLS/afterLogin.html"

              }

            } catch (err) {
              console.error(`Error: ${err}`);
            }
          }




