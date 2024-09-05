const email = document.querySelector('#email'),
      JambRegNumber = document.querySelector('#JambRegNumber'),
      MatricNumber = document.querySelector('#MatricNumber'),
      Name = document.querySelector('#Fullname'),
      StudentName = document.querySelector('#StudentName'),
      logout = document.querySelector('#logout'),
      localEmail= localStorage.getItem('email'),
      localName= localStorage.getItem('names'),
      localMatricNumber= localStorage.getItem('Matric_number'),
      localJambRegNumber= localStorage.getItem('jambRegNumber')


      console.log(localEmail);
      JambRegNumber.innerText = localJambRegNumber
      MatricNumber.innerText = localMatricNumber
      Name.innerText = localName
      StudentName.innerText = localName
      email.innerText = localEmail

      console.log(JambRegNumber);
      
      logout.addEventListener('click', ()=>{
        clearLocalStorage()
      })

      

      function clearLocalStorage() {
        localStorage.clear();
        console.log("Local storage cleared.");
        window.location.href = "../HTMLS/login.html"
    }



