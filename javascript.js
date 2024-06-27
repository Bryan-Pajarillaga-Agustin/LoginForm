// Firebase - start -
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYXUlz-5idVxz1FaPQ_VccFsQXU0rxk-0",
  authDomain: "testingstorage2.firebaseapp.com",
  projectId: "testingstorage2",
  storageBucket: "testingstorage2.appspot.com",
  messagingSenderId: "739634143005",
  appId: "1:739634143005:web:99d97b2e43f2968da04bf4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Firebase - end -


let switchTo = document.querySelector(".circle")
let base = document.querySelector(".base")
let SignInBox = document.getElementsByClassName("SigninBox")[0]
let SignInForm = document.getElementsByClassName("SignInForm")[0]
let UserForm = document.getElementsByClassName("UserForm")[0]
let LoginBox = document.getElementsByClassName("LoginBox")[0]
let RightLogout = document.getElementsByClassName("RightActionUsers")[0]
let backLog = document.getElementById("backLogin")
let backSign = document.getElementById("backSign")
let backUser = document.getElementById("backUser")
let backLogOut = document.getElementById("Back")
function SwitchTo(){
    setTimeout(() => {
       if(switchTo.classList.contains("Go-Right")) {
        switchTo.classList.replace("Go-Right", "Go-Left")
        base.classList.replace("off", "on")
        document.body.style.background = "url('images/background1.jpg')"

    } else if (switchTo.classList.contains("Go-Left")) {
        switchTo.classList.replace("Go-Left", "Go-Right")
        base.classList.replace("on", "off")
        document.body.style.background = "linear-gradient(138deg, yellow, orange, red)"
    } 
    }, 200);
}

// Code for functional buttons

function LoginForm(num){
    if(num == 0){
        LoginBox.style.display = "flex"
        SignInForm.style.display = "none"
    } else if(num == 1){
        RightLogout.style.display = "flex"
    }
    
}

backLog.addEventListener('click',() => {
    LoginBox.style.display = "none"
    console.log("error")
})
backSign.addEventListener('click',() => {
    SignInForm.style.display = "none"
})
backUser.addEventListener('click',() => {
    UserForm.style.display = "none"
    SignInForm.style.display = "flex"
})
backLogOut.addEventListener("click", () => {
    RightLogout.style.display = "none"
})
function SignIn(){
    LoginBox.style.display = "none"
    SignInForm.style.display = "flex"
}

// Code for variable Log in

let UsernameLogin = document.getElementById("Username")
let PasswordLogin = document.getElementById("Password")

let Username
let Password

// Code for variable  Sign in

let UsernameSignIn = document.getElementById("createuser")
let PasswordSignIn = document.getElementById("createpass")
let ConfirmSignIn = document.getElementById("confirm")

let CUsername 
let CPassword 
let CConfirm 

let ListofUsers
AssignVar()
function AssignVar(){
    var ParsedUpdate = JSON.parse(localStorage.getItem("DataUser"))
    ListofUsers = ParsedUpdate
    if(ListofUsers == null){
        ListofUsers = [{
            Username: "null",
            Password: "null",
            Profile: "null",
            Name: "null",
            Age: "null",
            Section: "null",
            Birthday: "null",
            LoginStatus: "false"
        }]
    }
    
    for(let i = 0; i < ListofUsers.length - 1; i++){
        if(ListofUsers[i].LoginStatus == true){
            
            document.getElementById("ProfileIcon").src = ListofUsers[i].Profile
            LoginBox.style.display = "none"
            alert("Welcome "+ListofUsers[i].Username)
            document.getElementById("ProfileIcon-None").style.display = "none"
            document.getElementById("ProfileIcon").style.display = "block"
            break;
        }
    }

}


function update(){

    CUsername = UsernameSignIn.value
    CPassword = PasswordSignIn.value
    CConfirm = ConfirmSignIn.value

    // Login part

    // if(Username.length <= 7 && Username.length > 0){
    //     document.querySelector("#violation0").textContent = "Character length is below 7"
    // } else if(Username.length <= 0){
    //     document.querySelector("#violation0").textContent = "Put the username first"
    // } else if(Username.length >= 8){
    //     document.querySelector("#violation0").textContent = ""
    // }

    // if(Password.length <= 0){
    //     document.querySelector("#violation0").textContent = "Put the username first"
    // } else if(Password == ){
    //     document.querySelector("#violation0").textContent = ""
    // }

    
    // Signing In Part

    if(CUsername.length <= 7 && CUsername.length > 0){
        document.querySelector("#violation0").textContent = "Character length is below 7"
    } else if(CUsername.length <= 0){
        document.querySelector("#violation0").textContent = "Put the username first"
    } else if(CUsername.length >= 8){
        document.querySelector("#violation0").textContent = ""
    }

    if(CPassword.length <= 7 && CPassword.length > 0){
        document.querySelector("#violation1").textContent = "Character length is below 7"
    } else if(CPassword.length <= 0){
        document.querySelector("#violation1").textContent = "Put the password first"
    } else if(CPassword.length >= 8){
        document.querySelector("#violation1").textContent = ""
    }

    if(CConfirm != CPassword){
        document.querySelector("#violation2").textContent = "The Password Doesn't match"
    } else if(CConfirm == CPassword){
        document.querySelector("#violation2").textContent = ""
    }

    // User info fill part
}

UsernameSignIn.addEventListener("keyup", () => {
    update() 
})
PasswordSignIn.addEventListener("keyup", () => {
    update() 
})
ConfirmSignIn.addEventListener("keyup", () => {
    update() 
})
function SignUp(){
    if((CUsername.length > 7)&&(CPassword == CConfirm)&&(CPassword.length > 7)){
        SignInForm.style.display = "none"
        UserForm.style.display = "flex" 
    } else { update() }
}

let fileItem
let fileName
let profileImg
function ChangeProfile(event){
    fileItem = event.target.files[0]
    fileName = document.getElementById("ProfileInput").value
    let storageRef = firebase.storage().ref("images/"+fileName)
    let uploadTask = storageRef.put(fileItem)
    
    uploadTask.on("state_changed", () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log(url)
            profileImg = url
            document.getElementById("profiledis").style.backgroundImage = "url('"+profileImg+"')"
        })
    })
}
function Proceed(){
    // Unshifting the new created account to the list of users
    

    let name = document.getElementById("Name").value
    let age = document.getElementById("Age").value
    let section = document.getElementById("Section").value
    let birthday = document.getElementById("Birthday").value 

    let NewUser = {
        Username: CUsername,
        Password: CPassword,
        Profile: profileImg,
        Name: name,
        Age: age,
        Section: section,
        Birthday: birthday,
        LoginStatus: false
    }

    ListofUsers.unshift(NewUser)

    var stringed = JSON.stringify(ListofUsers)
    localStorage.setItem("DataUser", stringed)
    var ParsedUpdate = JSON.parse(localStorage.getItem("DataUser"))

    ListofUsers = ParsedUpdate
    console.log(ListofUsers)
    UserForm.style.display = "none"
}

function PressedLogIn(){
    Username = UsernameLogin.value
    Password = PasswordLogin.value
    for(let i = 0; i < ListofUsers.length - 1; i++){
        if(Username == ListofUsers[i].Username && Password == ListofUsers[i].Password){
            ListofUsers[i].LoginStatus = true;
            document.getElementById("ProfileIcon").src = ListofUsers[i].Profile
            LoginBox.style.display = "none"
            alert("Welcome "+ListofUsers[i].Username)
            var stringed = JSON.stringify(ListofUsers)
            localStorage.setItem("DataUser", stringed)
            var ParsedUpdate = JSON.parse(localStorage.getItem("DataUser"))
        
            ListofUsers = ParsedUpdate

            document.getElementById("ProfileIcon-None").style.display = "none"
            document.getElementById("ProfileIcon").style.display = "block"
            break;
        }
    }
}

function LogOut(){
    document.getElementById("ProfileIcon-None").style.display = "block"
    document.getElementById("ProfileIcon").style.display = "none"
    RightLogout.style.display = "none"
    for(let i = 0; i < ListofUsers.length - 1; i++){
        if(ListofUsers[i].LoginStatus == true){
            ListofUsers[i].LoginStatus = false
            var stringed = JSON.stringify(ListofUsers)
            localStorage.setItem("DataUser", stringed)
        }
    }
}