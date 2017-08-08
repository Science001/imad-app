//Counter code

var button = document.getElementById('counter');

button.onclick = function() {
    
    //create request object
    var request = new XMLHttpRequest();
    
    //What to do with the request response
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            console.log('request.readyState === 4');
            if(request.status === 200) {
                console.log('request.status === 200');
                var counter = request.responseText;
                console.log('var counter = ' + counter);
                var span = document.getElementById('countvalue');
                console.log('var span = ' + span);
                span.innnerHTML = counter.toString();
                console.log('span.innerHTML = ' + span);
            }
        }
    };
    
    //Make the request
    request.open('GET','http://scienceganesh007.imad.hasura-app.io/counter',true);
    request.send(null);
};