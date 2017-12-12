function hovering(elem){
    elem.style.filter = "saturate(3)";
}
function Nothovering(elem){
    elem.style.filter = "saturate(1)";
}


var lines = document.querySelectorAll(".box");
var items = document.querySelectorAll(".t_link");


var exe_1 = function(){
    hovering(lines[0]);
}

var exe_2 = function(){
    hovering(lines[1]);
}

var exe_3 = function(){
    Nothovering(lines[0]);
}

var exe_4 = function(){
    Nothovering(lines[1]);
}

items[0].addEventListener("mouseover", exe_1);
items[1].addEventListener("mouseover", exe_2);

items[0].addEventListener("mouseout", exe_3);
items[1].addEventListener("mouseout", exe_4);