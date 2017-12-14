var instance;
function init(){
    if (!createjs.Sound.initializeDefaultPlugins()) {console.log("No Sound js installed"); return;}
    
    var ambient = "assets/ambient.ogg";
    var return_ = "assets/return.ogg";
    var hover = "assets/hover.ogg";

    var rare = "assets/rare.ogg";
    var epic = "assets/epic.ogg";
    var legendary = "assets/legendary.ogg";
    
    
    createjs.Sound.on("fileload", loadHandler, this);

    createjs.Sound.registerSound(ambient, "main");
    createjs.Sound.registerSound(rare, "rare");
    createjs.Sound.registerSound(epic, "epic");
    createjs.Sound.registerSound(legendary, "legendary");
    createjs.Sound.registerSound(return_, "return_");
    createjs.Sound.registerSound(hover, "hover");
}
function loadHandler(event) {
    instance = createjs.Sound.play("main", {loop: Infinity});
    instance.volume = 0.08;
}

$(window).bind("load", init);
