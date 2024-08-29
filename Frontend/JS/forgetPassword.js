const step1 = document.querySelector(".step1"),
    step2 = document.querySelector(".step2"),
    step3 = document.querySelector(".step3"),
    emailAddress = document.getElementById("emailAddress"),
    verifyEmail = document.getElementById("verifyEmail"),
    inputs = document.querySelectorAll(".otp-group input"),
    nextButton = document.querySelector(".nextButton"),
    emailErrorMsg = document.querySelector(".emailErrorMsg")
    verifyButton = document.querySelector(".verifyButton"),
    baseURL = "http://localhost:305/";

let OTP = "";

window.addEventListener("load", () => {
    emailjs.init("MMZU0R11WiSHWcaBy");
    step2.style.display = "none";
    step3.style.display = "none";
    nextButton.classList.add("disable");
    verifyButton.classList.add("disable");
    let localemail = localStorage.getItem('email')
    verifyEmail.innerHTML = localemail
    

    function timeout(action, delay = 3000) { 
        setTimeout(action, delay);
    }
    
    function myAction() {
        console.log("Action executed!");
    }
    
    // Example usage
    timeout(myAction);

});


async function checkEmail(url, data) {
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
        emailErrorMsg.innerText = 'Incorrect Email address';

        function timeout(action, delay = 1500) { 
            setTimeout(action, delay);
        }
        
        function myAction() {
        emailErrorMsg.innerText = '';
        }
        
        // Example usage
        timeout(myAction);
      }

      if (bodydata.message == "logged") {
        nextButton.innerHTML = "&#9889; Sending...";

        function timeout(action, delay = 1500) { 
            setTimeout(action, delay);
        }
        
        function myAction() {
            step1.style.display = "none";
            step2.style.display = "block";
        }
        
        timeout(myAction);


        

      }

    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }




const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        nextButton.classList.remove("disable");
    } else {
        nextButton.classList.add("disable");
    }
};

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

inputs.forEach((input, input1) => {
    input.addEventListener("keyup", function (e) {
        if (this.value.length >= 1) {
            e.target.value = e.target.value.substr(0, 1);
        }
        const currentInput = input
        const nextInput = input.nextElementSibling
        const prevInput = input.previousElementSibling

        if(nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== ""){
            nextInput.removeAttribute("disabled")
            nextInput.focus()
        }

        if(e.key === "Backspace"){
            inputs.forEach((input, index2) => {
                if(input1 <= index2 && prevInput) {
                    input.setAttribute("disabled", true)
                    input.value = ""
                    prevInput.focus()
                }
            })
        }

        if (
            inputs[0].value != "" &&
            inputs[1].value != "" &&
            inputs[2].value != "" &&
            inputs[3].value != ""
        ) {
            verifyButton.classList.remove("disable");
        } else {
            verifyButton.classList.add("disable");
        }
    });
});

const serviceID = "service_pe90lid";
const templateID = "template_syw0t04";
emailAddress.innerHTML = "ioiojjioj";
// emailAddress.innerText = localStorage.getItem('email'),

nextButton.addEventListener("click", () => {
    OTP = generateOTP();
    console.log(emailAddress.value);

    let userData = {
        email: emailAddress.value.trim(),
      };
      console.log(userData);
      checkEmail(`${baseURL}login/emailCheck`, userData);
    

    let templateParameter = {
        from_name: "AFIT Portal",
        OTP: OTP,
        message: "message sent",
        reply_to: emailAddress.value,
    };
    emailjs.send(serviceID, templateID, templateParameter).then(
        (res) => {
            console.log(res);
            nextButton.innerHTML = "Next &rarr;";
        },
        (err) => {
            console.log(err);
        }
    );
});







verifyButton.addEventListener("click", () => {
    let values = "";
    inputs.forEach((input) => {
        values += input.value;
    });
    console.log(OTP);

    if (OTP == values) {
        step1.style.display = "none";
        step2.style.display = "none";
        step3.style.display = "block";

        function timeout(action, delay = 2000) { 
            setTimeout(action, delay);
        }
        
        function myAction() {
            window.location.href = "../HTMLS/changePassword.html"
        }
        
        timeout(myAction);
        



    } else {
        verifyButton.classList.add("error-shake");

        function timeout(action, delay = 500) { 
            setTimeout(action, delay);
        }
        
        function myAction() {
            verifyButton.classList.remove("error-shake");
        }
        
        timeout(myAction);
    }

});

function changeMyEmail() {
    step1.style.display = "block";
    step2.style.display = "none";
    step3.style.display = "none";
}
