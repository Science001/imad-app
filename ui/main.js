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
                console.log("Log in success");
                alert('Logged in successfully');
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
                console.log("Log in success");
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