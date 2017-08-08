//Counter code

var button = document.getElementById('counter');

button.onclick = function() {
    
    //create request object
    var request = new XMLHttpRequest();
    
    //What to do with the request response
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('countvalue');
                span.innnerHTML = counter;
            }
        }
    };
    
    //Make the request
    request.open('GET','http://scienceganesh007.imad.hasura-app.io/counter',true);
    request.send(null);
};