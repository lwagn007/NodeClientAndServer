const url = "http://localhost:3000/";
// Post - /createuser

function userSignUp() {
    let userName = document.getElementById("userSignUp").value;
    let userPassword = document.getElementById("passSignUp").value;

    console.log(userName, userPassword);

    let newUserData = {
        user:
        {
            username: userName,
            password: userPassword
        }
    };

    fetch(`${url}api/user/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserData)
    })
        .then(response => response.json())
        .then(function (response) {
            console.log(response.sessionToken);
            let token = response.sessionToken;
            localStorage.setItem("SessionToken: ", token);
        });
}

function userLogin() {
    let userName = document.getElementById("userLogin").value;
    let userPassword = document.getElementById("passLogin").value;

    console.log(userName, userPassword);

    let userData = {
        user: {
            username: userName,
            password: userPassword
        }
    };

    fetch(`${url}api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())
        .then(function (response) {
            console.log(response.sessionToken);
            let token = response.sessionToken;
            localStorage.setItem("SessionToken", token);
        });
}

function getSessionTokenFromLocalStorage(){
    var data = localStorage.getItem("SessionToken");
    console.log(data);
    return data;
}