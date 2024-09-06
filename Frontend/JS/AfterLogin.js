const step1 = document.querySelector(".step1"),
    step2 = document.querySelector(".step2"),
    step3 = document.querySelector(".step3"),
    emailAddress = document.getElementById("emailAddress"),
    verifyEmail = document.getElementById("verifyEmail"),
    inputs = document.querySelectorAll(".otp-group input"),
    nextButton = document.querySelector(".nextButton"),
    verifyButton = document.querySelector(".verifyButton");
    flow = localStorage.getItem('flow')
    console.log(flow);
    if (flow != "one") {
        window.location.href = "../HTMLS/login.html"
    }

    flow2 = "two"

    

let OTP = "";

window.addEventListener("load", () => {
    inputs[0].focus()
    emailjs.init("MMZU0R11WiSHWcaBy");
    let localemail = localStorage.getItem('email')
    verifyEmail.innerHTML = localemail
    
    const generateOTP = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };



    OTP = generateOTP();
    console.log(OTP)
    console.log(localemail);
    let templateParameter = {
        from_name: "Kene",
        OTP: OTP,
        message: "message sent",
        reply_to: localemail,
    };
    emailjs.send(serviceID, templateID, templateParameter).then(
        (res) => {
            console.log(res);
        },
        (err) => {
            console.log(err);
        }
    );
});

const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        nextButton.classList.remove("disable");
    } else {
        nextButton.classList.add("disable");
    }
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
console.log(localStorage.getItem('email'));
LemailAddress = localStorage.getItem('email')
// emailAddress.innerHTML = LemailAddress






// nextButton.addEventListener("click", () => {
//     nextButton.innerHTML = "&#9889; Sending...";
//     // alert(OTP)
//     OTP = generateOTP();
//     let templateParameter = {
//         from_name: "Kene",
//         OTP: OTP,
//         message: "message sent",
//         reply_to: emailAddress.value,
//     };
//     emailjs.send(serviceID, templateID, templateParameter).then(
//         (res) => {
//             console.log(res);
//         },
//         (err) => {
//             console.log(err);
//         }
//     );
// });



verifyButton.addEventListener("click", () => {
    let values = "";
    inputs.forEach((input) => {
        values += input.value;
    });

    if (OTP == values) {
        console.log("tdftudytdut");
        
        // step1.style.display = "none";
        step2.style.display = "none";
        step3.style.display = "block";
        localStorage.setItem("flow2", flow2)
    } else {
        verifyButton.classList.add("error-shake");
    }

    function timeout(action, delay = 2000) { 
        setTimeout(action, delay);
    }
    
    function myAction() {
        console.log("Action executed!");
        window.location.href = "../HTMLS/dashboard.html"
    }
    
    // Example usage
    timeout(myAction);


});

function changeMyEmail() {
    step2.style.display = "none";
    step3.style.display = "none";

     window.location.href = "../HTMLS/login.html"
}
