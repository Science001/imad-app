console.log('Loaded!');

//Move image
var img = document.getElementById("madi");
var marginLeft=0;
function moveRight(){
    marginLeft++;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function(){
    var interval = setInterval(moveRight, 10);
};