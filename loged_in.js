let socket = io()


// grab the signup message elements from the signup.html DOM 

let alertMess = document.getElementById("alertMessage")
let sAlertMess = document.getElementById("signUpAlertMessage")

let myID

// Socket event alerting the user
// that their username is not 
// contained within the database

socket.on("usrNotFound", (id) => {
  if(id === myID)
    {
     alertMess.innerHTML = "User Not Found!";
      alertMess.style.color = "red"; 
    }
})

// Socket event to redirect to main page
// upon successful login

socket.on("succesfulLogin", (id) => {
  if(id == myID)
    {
      window.location.href = "mainPage.html" + "?" + id;
    }
})

// Socket event to alert the user
// that hey have entered in their password wrong

socket.on("NotAllowed", (id) => {
  if(id === myID)
    {
     alertMess.innerHTML = "Not Allowed!";
      alertMess.style.color = "red"; 
    }
})

// Socket event to tell the user to 
// reconfirm their password

socket.on("reconfirmYourPass", (id) => {
  console.log("The id is " + id);
  console.log("The myID is " + myID);
  if(id === myID)
    {
     sAlertMess.innerHTML = "Reconfirm Password!";
     sAlertMess.style.color = "red"; 
    }
})

// Socket event to alret the user
// their signup was successful

socket.on("successfulSignUp", (id) => {
  if(id === myID)
    {
     sAlertMess.innerHTML = "Acount Created!";
     sAlertMess.style.color = "green"; 
      
    }
})

// Function to obtain signup information
// from the user and sign them up into
// the server

function signupFunc()
{
    console.log(document.getElementById("suname").value);
    console.log(document.getElementById("spsw").value);
    console.log(document.getElementById("scpsw").value);

    if(document.getElementById("spsw").value === document.getElementById("scpsw").value)
    {
        socket.emit('signup', {username: document.getElementById("suname").value, password: document.getElementById("spsw").value})
        myID = document.getElementById("suname").value;
    }
    else
    {
        console.log("Reconfirm password")
        socket.emit('reconfirmPass', {username: document.getElementById("suname").value})
        myID = document.getElementById("suname").value;
    }
}

function loginFunc()
{
    socket.emit('login', {username: document.getElementById("uname").value, password: document.getElementById("psw").value})
    myID = document.getElementById("uname").value; 
}