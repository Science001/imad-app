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
                document.getElementById('countvalue').innnerHTML = counter.toString();
            }
        }
    };
    
    //Make the request
    request.open('GET','http://scienceganesh007.imad.hasura-app.io/counter',true);
    request.send(null);
};

//Submit Button

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onlick = function() {
    //Request
    
    //Render
    var names = ['name1','name2','name3','name4'];
    var list ='';
    for(var i=0; i<names.length; i++) {
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namesList');
    ul.innerHTML = list;
};