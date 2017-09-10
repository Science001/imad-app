//Check login
function loggedin() {
    var checkLogin = new XMLHttpRequest();
    
    checkLogin.onreadystatechange = function() {
            if(checkLogin.readyState === XMLHttpRequest.DONE) {
                if(checkLogin.status === 200) {
                    showLogin(checkLogin.responseText);
                } else if (checkLogin.status === 500) {
                    alert('Something went wrong!');
                }
            }
    };
    
    checkLogin.open('GET', 'http://scienceganesh007.imad.hasura-app.io/check-login', true);
    checkLogin.send(null);
}

function showLogin(username) {
    document.getElementById("after-login").style.display="inline";
    document.getElementById("loggedin-username").innerHTML=username;
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
                showLogin(JSON.stringify(request.responseText.username));
                console.log(request.responseText.username);
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

var logout = document.getElementById('submit_btn_logout');

logout.onclick = function() {
    //create request object
    var request = new XMLHttpRequest();
    
    //What to do with the request response
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                //Render
                console.log("Logout success");
                alert(request.responseText);
                document.getElementById("after-login").style.display="none";
                document.getElementById("user-form").style.display="block";
            }
            else if (request.status === 500) {
                alert('Something went wrong!');
            }
        }
    };
    
    //Make the request
    request.open('GET','http://scienceganesh007.imad.hasura-app.io/logout', true);
    request.send(null);
};