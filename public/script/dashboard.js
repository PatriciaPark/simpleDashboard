const email = localStorage.getItem('emailForSignIn');

function emailVerification(email){
const data = { email: email, emailVerification: 1 };
// update database - email verification(emailVerification= 0 -> 1)
fetch('/api/users/verificationData/'+ email, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success Email Verification:', data);
        userData(data);
    })
    .catch((error) => {
        console.error('Fail to Email Verification:', error);
    });
}

function getAllUsers(){
    // Get All users infomation
    fetch('/api/users/')
        .then((response) => response.json())
        .then((data) => {
            appendData(data);
        })
        .catch((error) => {
        console.error('Fail to Get All Users:', error);
    });
}

function userData(data) {
    var userName = document.getElementById("username");
    // Login user info
    var div = document.createElement("div");
    div.innerHTML = data.username;
    userName.appendChild(div);
    // remove email from local storage
    // window.localStorage.removeItem('emailForSignIn');
}

function appendData(data) {
    var dataList = document.getElementById("dataList");
    var div = document.createElement("div");
    div.setAttribute("class", "grid-item");
    // All users info
    if(data.length) {
        for(var i = 0; i< data.length; i++) {
            div.append = data[i].id;
            div.append = data[i].username;
            div.append = data[i].email;
            div.append = data[i].createdAt;
            div.append = data[i].loginCnt;
            div.append = data[i].lastSession;
            
            dataList.appendChild(div);
        }
    } else {
        div.innerHTML = "No Data Availed";
    } 
}

window.addEventListener('DOMContentLoaded', function() {
    if(email) {
        emailVerification(email)
    };
    getAllUsers()
    // , document.getElementById("btnUserInfo").addEventListener("click")
});