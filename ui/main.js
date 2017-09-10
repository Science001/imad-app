//Check login
function loggedin() {
    var checkLogin = new XMLHttpRequest();
    
    checkLogin.onreadystatechange = function() {
            if(checkLogin.readyState === XMLHttpRequest.DONE) {
                if(checkLogin.status === 200) {
                    showLogin(checkLogin.responseText);
                }
            }
    };
    
    checkLogin.open('GET', 'http://scienceganesh007.imad.hasura-app.io/check-login', true);
    checkLogin.send(null);
}

function showLogin(username) {
    document.getElementById("user-details").style.display="inline";
    document.getElementById("loggedin-username").innerHTML=response;
    document.getElementById("user-form").style.display="none";
}

//Submit login details

var submit = document.getElementById('submit_btn');

submit.onclick = function() {
    //create request object
    var request = new XMLHttpRequest();
    
    //What to do with the request response
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                //Render
                showLogin(request.responseText);
                console.log("Log in success");
            }
            else if(request.status === 403) {
                alert('Username/password incorrect');
            }
            else if (request.status === 500) {
                alert('Something went wrong!');
            }
        }
    };
    
    //Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://scienceganesh007.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

var signup = document.getElementById('submit_btn_signup');

signup.onclick = function() {
    //create request object
    var request = new XMLHttpRequest();
    
    //What to do with the request response
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                //Render
                console.log("Signup success");
                alert('Registered successfully');
            }
            else if (request.status === 500) {
                alert('Something went wrong!');
            }
        }
    };
    
    //Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    request.open('POST','http://scienceganesh007.imad.hasura-app.io/create-user', true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: password}));
};