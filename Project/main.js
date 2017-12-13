let allowAnimation = false;
let allowRender = true;
var one_time_use = true;
let keyboard = {};//keyboard input

var move_0,move_0_1, move_1, move_2, move_3;//tween stuff

let loader, model, animation, mixer, clock, flyControl;//all sorts of stuff
var orbitControls, orbitControls_1, orbitControls_2;//orbit around the 3 models
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var camera, camera_1, camera_2, camera_3, camera_4,
    scene, scene_1, scene_2, scene_3,scene_4, scene_selector,
    renderer;
var mesh, defaultColor, mainInn;
var uvSet;
var particleSYS,options, spawnerOptions;
var tick = 0;
var lightMap;
var lastFrame, currentFrame = 0;
var clicked, highlighted = false;
var totalAnimTime = 8.9;
var one_chance = true;
var mouseY, mouseX;
var allowRenderScroll = true;
var resized = false;
var itemNum, recorded;
var clips;
var delta1;


var chestOpen, gun,book,crystal;//the rest of the models
var gun_copy,book_copy,crystal_copy;
function init(){

    scene = new  THREE.Scene();
    scene.name = "Title_scene";
    scene_1 = new THREE.Scene();
    scene_1.name = "OpenedChest_scene";
    scene_2 = new THREE.Scene();
    scene_2.name = "first_item";
    scene_3 = new THREE.Scene();
    scene_3.name = "second_item";
    scene_4 = new THREE.Scene();
    scene_4.name =  "third_item";
    scene_selector = 0;

    
    //var gui = new dat.GUI();//add this to help with gui values
    var enableFog = true;
    loader = new THREE.JSONLoader();
    clock = new THREE.Clock();
    var cube = getPlane(20);
    var light_00 = getAmbientLight(3);
    var light_01 = getAmbientLight(4.5);
    var light_02 = getAmbientLight(4.5);
    var light_03 = getAmbientLight(4.5);
    scene_1.add(light_00);

    scene_2.add(light_01);
    
    scene_3.add(light_02);

    scene_4.add(light_03);
   
    if(enableFog == true){
        scene.fog = new THREE.FogExp2(0xf58012, 0.0005);
    }
    

    
    var sphere2 = getSphere(2);
    var ambientLight = getAmbientLight(2.4);
    scene.add(ambientLight);

    var pointLight = getPointLight(1, 0xf2e0d0,0,1);
    pointLight.position = reposition(pointLight.position,-22,7,-6.5);
    scene.add(pointLight);


    var pointLight_1 = getPointLight(1, 0xf2e0d0,0,1);
    pointLight_1.position = reposition(pointLight_1.position,3,7,11); 
    scene.add(pointLight_1);
    
    
    var pointLight_2 = getPointLight(1,0xf2e0d0,0,1);
    pointLight_2.position = reposition(pointLight_2.position,-16.3,7,10.3); 
    scene.add(pointLight_2);

    var pointLight_3 = getPointLight(3,0xf2e0d0,0,0.8);//this is a big candle
    pointLight_3.position = reposition(pointLight_3.position,1.5,10.5,-19); 
    scene.add(pointLight_3);


    var pointLight_4 = getPointLight(3,0xf2e0d0,0,0.5);//BIGGEST CANDLE,OW YEAH
    pointLight_4.position = reposition(pointLight_4.position,-39.5,6,-35.5);  
    scene.add(pointLight_4);

    var pointLight_5 = getPointLight(1, 0xf2e0d0,0,1);
    pointLight_5.position = reposition(pointLight_5.position,-27,10,-27);
    scene.add(pointLight_5);


    loader.load("../models/JSON/Inn/Inn.json", addModel);
    loader.load("../models/JSON/Chest/Chest.json", addModelAnim);
    loader.load("../models/JSON/Chest/Chest_Open.json", function(geometry, materials){
        materials[0].skinning = true;
        chestOpen = new THREE.Mesh(geometry, materials);
        chestOpen.scale.set(1.5,1.5,1.5);
        chestOpen.receiveShadow = true;
        chestOpen.castShadow = true;
        //chestOpen.material[0].shininess = 0;
        scene_1.add(chestOpen); 
    });
    loader.load("../models/JSON/Crystal/Crystal.json", function(geometry, materials){
        materials[0].skinning = true;
        crystal = new THREE.Mesh(geometry, materials);
        crystal.scale.set(.6,.6,.6);
        crystal.position.set(-3.5,1.3,-0.2);
        crystal.receiveShadow = true;
        crystal.castShadow = true;
        crystal.name = "crystal";
        scene_1.add(crystal);
        
        //add to the special scene immediately 
    });
    loader.load("../models/JSON/Crystal/Crystal.json", function(geometry, materials){
        materials[0].skinning = true;
        crystal_copy = new THREE.Mesh(geometry, materials);
        crystal_copy.position.set(1,1,0);
        crystal_copy.receiveShadow = true;
        crystal_copy.castShadow = true;
        scene_2.add(crystal_copy);
        //add to the special scene immediately 
    });
    loader.load("../models/JSON/Magic_Book/Magic_Book.json", function(geometry, materials){
        materials[0].skinning = true;
        book = new THREE.Mesh(geometry, materials);
        book.scale.set(0.48,0.48,0.48);
        book.position.set(0,1.2,0);
        book.receiveShadow = true;
        book.castShadow = true;
        book.name = "book";
        scene_1.add(book);
    });
    loader.load("../models/JSON/Magic_Book/Magic_Book.json", function(geometry, materials){
        materials[0].skinning = true;
        book_copy = new THREE.Mesh(geometry, materials);
        book_copy.receiveShadow = true;
        book_copy.castShadow = true;
        scene_3.add(book_copy);//add to the special scene immediately 
    });
    loader.load("../models/JSON/rifle/Rifle.json", function(geometry, materials){
        materials[0].skinning = true;
        gun = new THREE.Mesh(geometry, materials);
        gun.scale.set(0.48,0.48,0.48);
        gun.position.set(2,2,-0.6);
        gun.rotation.set(0,0,-Math.PI/2);
        gun.receiveShadow = true;
        gun.castShadow = true;   
        gun.name = "gun";   
        scene_1.add(gun); 
    });
    loader.load("../models/JSON/rifle/Rifle.json", function(geometry, materials){
        materials[0].skinning = true;
        gun_copy = new THREE.Mesh(geometry, materials);
        gun_copy.receiveShadow = true;
        gun_copy.castShadow = true;
        gun_copy.rotation.set(0,Math.PI/2,0);
        gun_copy.position.set(0,-2,0);
        scene_4.add(gun_copy);//add to the special scene immediately 
    });
    
    camera = new THREE.PerspectiveCamera(
        60,//angle
        (window.innerWidth/1.5)/(window.innerHeight/1.25),//aspect
        1,
        1000
    );
    scene.add(camera);
    camera_1 = new THREE.PerspectiveCamera(
        60,//angle
        (window.innerWidth/1.5)/(window.innerHeight/1.25),//aspect
        1,
        1000
    );
    scene_1.add(camera_1);
    camera_2 = new THREE.PerspectiveCamera(
        60,//angle
        (window.innerWidth/1.5)/(window.innerHeight/1.25),//aspect
        1,
        1000
    );
    scene_2.add(camera_2);
    camera_3 = new THREE.PerspectiveCamera(
        60,//angle
        (window.innerWidth/1.5)/(window.innerHeight/1.25),//aspect
        1,
        1000
    );
    scene_3.add(camera_3);
    camera_4 = new THREE.PerspectiveCamera(
        60,//angle
        (window.innerWidth/1.5)/(window.innerHeight/1.25),//aspect
        1,
        1000
    );
    scene_4.add(camera_4);

    particleSYS = new THREE.GPUParticleSystem( {
        maxParticles: 25000
    } );
    scene.add( particleSYS );


    options = {
        position: new THREE.Vector3(),
        positionRandomness: .6,
        velocity: new THREE.Vector3(),
        velocityRandomness: .9,
        color: 0xaa88ff,
        colorRandomness: .2,
        turbulence: .24,
        lifetime: 2,
        size: 4,
        sizeRandomness: 4
    };
    spawnerOptions = {
        spawnRate: 15000,
        horizontalSpeed: 3,
        verticalSpeed: 1.8,
        timeScale: 1
    };

    /*
    gui.add( options, "velocityRandomness", 0, 3 );
    gui.add( options, "positionRandomness", 0, 3 );
    gui.add( options, "size", 1, 20 );
    gui.add( options, "sizeRandomness", 0, 25 );
    gui.add( options, "colorRandomness", 0, 1 );
    gui.add( options, "lifetime", .1, 10 );
    gui.add( options, "turbulence", 0, 1 );
    gui.add( spawnerOptions, "spawnRate", 10, 30000 );
    gui.add( spawnerOptions, "timeScale", -1, 1 );
    */
    
    camera.position.y = 12;
    camera.position.z = 20;

    camera_1.position.y = 8;
    camera_1.position.z = 1.5;

    camera_2.position.y = 7;
    camera_2.position.z = 2;
    camera_2.position.x = 8;

    camera_3.position.y = 10;
    camera_3.position.z = 10;

    camera_4.position.y = 0;
    camera_4.position.z = 10;

    flyControl = new THREE.FlyControls(camera, document.querySelector("#webgl"));
    orbitControls = new THREE.OrbitControls( camera_2, document.querySelector("#webgl") );
    orbitControls_1 = new THREE.OrbitControls( camera_3, document.querySelector("#webgl") );
    orbitControls_2 = new THREE.OrbitControls( camera_4, document.querySelector("#webgl") );
    orbitControls_1.enableZoom = false;
    orbitControls_2.enableZoom = false;
    orbitControls.enableZoom = false;


    var initial = new THREE.Vector3( 0, 1, 0 );

    camera.lookAt(initial);
    camera_1.lookAt(initial);
    camera_2.lookAt(initial);
    camera_3.lookAt(initial);
    camera_4.lookAt(initial);
    
    var Euler = new THREE.Euler(-0.5, 0 ,0, 'XYZ');
    initial = new THREE.Vector3(0.1, 0, -4);

    move_0 = new TWEEN.Tween({val: camera.rotation.x})
        .to({val:Euler.x},5500)
        .onUpdate(function(){
            camera.rotation.x = this.val;
        })
        
    move_0_1 = new TWEEN.Tween({val: camera.rotation.y})
        .to({val:Euler.y},5500)
        .onUpdate(function(){
            camera.rotation.y = this.val;
        })
                                                                             

    move_1 = new TWEEN.Tween({val: camera.position.z})
        .to({val: -2}, 2000)
        .delay(5500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(function(){
            //update the z and x position and tell the camera to look at chest
            
            camera.position.z = this.val;
            camera.lookAt(initial);
            console.log(camera.rotation);
           // cameraZPosition.position.z = this.val;
        })


    move_2 = new TWEEN.Tween({val: camera.position.x})
        .to({val: 2}, 2000)
        .delay(5500)
        .onUpdate(function() {
            camera.position.x = this.val;

            camera.lookAt(initial);
        })

    move_3 = new TWEEN.Tween({val: camera.position.y})
        .to({val: 22}, 1000)
        .delay(5500)
        
        .onUpdate(function() {
           camera.position.y = this.val;
           camera.lookAt(initial);
        })

    move_4 = new TWEEN.Tween({val: 22})
        .to({val: 0}, 1000)
        .delay(6500)

        .onUpdate(function(){
            camera.position.y = this.val;
            camera.lookAt(initial);
        })
    
    
        


    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMapSoft = true;
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.25);

    renderer.setClearColor('rgb(0, 0, 0)');

    document.getElementById('webgl').appendChild(renderer.domElement);
    

    update(renderer, scene, camera, flyControl);//pass in the first scene on init
}

function getBox(w, h, d){

    var geometry = new THREE.BoxGeometry(w, h, d);
    var material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)'
    });
    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    return mesh;
}

function getSphere(size){
    
        var geometry = new THREE.SphereGeometry(size, 24, 24);
        var material = new THREE.MeshBasicMaterial({
            color: 'rgb(255,255,255)'
        });
        var mesh = new THREE.Mesh(
            geometry,
            material
        );
        return mesh;
    }
function reposition(position,a,b,c){
    position.x = a;
    position.y= b;
    position.z = c;
}

function getPlane(size){
    
        var geometry = new THREE.PlaneGeometry(size, size);
        var material = new THREE.MeshPhongMaterial({
            color: 'rgb(120, 120, 120)',
            side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh(
            geometry,
            material
        );
        mesh.receiveShadow = true;
        return mesh;
    }
    function getPointLight(intensity,color, distance, decay){
        var light = new THREE.PointLight(color, intensity, distance, decay);
        light.castShadow = true;
        
        return light;

    }
    function getAmbientLight(intensity){
        var light = new THREE.AmbientLight(0xe5ac62, intensity);
        return light;

    }

    
    function getSpotLight(intensity){
        var light = new THREE.SpotLight(0xffffff, intensity);
        light.castShadow = true;

        light.shadow.bias = 0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        return light;

    }
    function getDirectionalLight(intensity){
        var light = new THREE.DirectionalLight(0xffffff, intensity);
        light.castShadow = true;

        light.shadow.camera.left = -40;
        light.shadow.camera.bottom = -40;
        light.shadow.camera.right = 40;
        light.shadow.camera.top = 40;

        light.shadow.mapSize.width = 4096;
        light.shadow.mapSize.height = 4096;
        return light;
    }

    function update(renderer, cur_scene, cur_camera, controls){
       var array_out = determinScene();
       cur_scene = array_out[0];
       cur_camera = array_out[1];
       delta1 = clock.getDelta() * spawnerOptions.timeScale;
       
       
       lastFrame = tick;
       tick += delta1;
       if ( tick < 0 ) tick = 0;

       if(scene_selector == 0){
        
        if(mouseY < 750 && mouseY > 10 && mouseX > 200 && mouseX < 1600)
            controls.update(delta1*10);
        
        if ( delta1 > 0 ) {
            options.position.x = (Math.sin( tick * spawnerOptions.horizontalSpeed ) * 7)+.75;
            options.position.y = (Math.sin( tick * spawnerOptions.verticalSpeed ) * 1.5)+6;
            options.position.z = (Math.sin( tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed ) * 8) -2;
            for ( var x = 0; x < spawnerOptions.spawnRate * delta1; x++ ) {
                
                particleSYS.spawnParticle( options );
            }
        }
        particleSYS.update( tick );
        if(allowAnimation){
            mixer.update(delta1);
        }
        camera.rotation.x = Clamp(-0.6,camera.rotation.x,-0.1);
        camera.rotation.z = 0;
        camera.rotation.y = Clamp(-0.3,camera.rotation.y,0.01);
        
        if(highlighted && clicked){
            allowAnimation = !allowAnimation;
            flyControl.dispose();
            move_0.start();
            move_0_1.start();
            move_1.start();
            move_2.start();
            move_3.start();
            move_4.start();
            
        }

        if(allowAnimation){
            TWEEN.update();
            totalAnimTime -= 0.075;
            if(totalAnimTime < -2.5 && one_chance){
                changeScene();
                one_chance = false;
                
            }
        }
       }

       
       if(scene_selector == 1){
                console.log(scene_selector);
            if(itemNum != 0 && clicked){
                changeScene();
            }

       }
       if(lastFrame>currentFrame){
            clicked = false;
        }
       
       
        if(allowRender){
        
        renderer.render(
            cur_scene,
            cur_camera
        );               
    }

        requestAnimationFrame(function(){
            update(renderer, cur_scene, cur_camera, controls);
        });

        

    }


    function keyDown(e){
        keyboard[e.keyCode] =  !keyboard[e.keyCode];
    }

    function addModelAnim(geometry, materials){
        for(var i = 0; i< materials.length; i++){
            materials[i].morphTargets = true;
        }
        materials.skinning = true;
        materials[0].shininess = 0;
        model = new THREE.Mesh(geometry, materials);
        model.receiveShadow = true;
        model.castShadow = true;
        model.name = "chest";
        mixer = new THREE.AnimationMixer(model); 
        clips = model.geometry.animations;     
        var action = mixer.clipAction( clips[0] );
        action.play();
        

        scene.add(model); 
        mesh = model;    
        
        defaultColor = model.material[0].color;
        
    }
    function addModel(geometry, materials){
        materials[0].skinning = true;
        
        mainInn = new THREE.Mesh(geometry, materials);
        
        
        var test = new THREE.TextureLoader();
        test.load("../models/JSON/Inn/emissive.png", assignEmissive);
        mainInn.material[0].needsUpdate = true;
        mainInn.position = new THREE.Vector3(0,0,0);
        mainInn.scale.x = 3.5;
        mainInn.scale.y = 3.5;
        mainInn.scale.z = 3.5;
        mainInn.position.y = -11.5;
        mainInn.position.x = -13;
        mainInn.position.z = -28;
        mainInn.rotation.y = Math.PI/3;
        
        mainInn.receiveShadow = true;
        mainInn.castShadow = true;
        
        mainInn.material[0].shininess = 0;
        mainInn.material[0].emissiveIntensity = 3;
        
        scene.add(mainInn); 

           
        
           
    }

    function assignEmissive(EM){
        mainInn.material[0].emissiveMap = EM;
        mainInn.material[0].needsUpdate = true;
        mainInn.material[0].emissive = new THREE.Color(0xffffff);
        
    }

    function Clamp(min,mid,max){
        return Math.min(Math.max(min,mid),max)
      }
      
    function handleVisibilityChange() {
        if (document.visibilityState == "hidden") {
          allowRender = false;
          console.log("stop render");
        } else {
          allowRender = true;
        }
    }

    function onMouseMove( event ) {
        mouseY = event.clientY;
        mouseX = event.clientX;
        mouse.x = ( ((event.clientX)) / ((window.innerWidth))) * 2 - 1;
        mouse.y = - ( (event.clientY) / (window.innerHeight) ) * 2 + 1; 

        var active = determinScene();
        
        
        raycaster.setFromCamera( mouse, active[1] );   
        if(mesh == undefined || book == undefined || gun == undefined || crystal == undefined)
            return;
          
        var intersects = raycaster.intersectObjects(active[0].children);

            if(scene_selector == 0){
                for(var i = 0; i<intersects.length; i++){
                    if(intersects[i].object.name == "chest" ){
                        
                        mesh.material[0].color = new THREE.Color(0xB4FAF1);
                        highlighted = true;
                        break;
                    }       
                    else{
                        mesh.material[0].color  = new THREE.Color(0.5,0.5,0.5);
                        highlighted = false;
                    }
                }
                
            }
            
            if(scene_selector==1 ){ 
                for(var i = 0; i<intersects.length; i++){
                    if(intersects[i].object.name == "crystal" ){
                        console.log("here");
                        itemNum = 1;
                        crystal.material[0].color = new THREE.Color(0xB4FAF1);
                        
                        break;
                    }       
                    else{
                        crystal.material[0].color  = new THREE.Color(0.5,0.5,0.5);
                        itemNum = 0;
                    }
                }
                if(itemNum == 1)
                    return;
                for(var i = 0; i<intersects.length; i++){
                    if(intersects[i].object.name == "book" ){
                        itemNum = 2;
                        book.material[0].color = new THREE.Color(0xB4FAF1);
                        
                        break;
                    }       
                    else{
                        book.material[0].color  = new THREE.Color(0.5,0.5,0.5);
                        itemNum = 0;
                    }
                }
                if(itemNum == 2)
                    return;
                for(var i = 0; i<intersects.length; i++){
                    if(intersects[i].object.name == "gun" ){
                        itemNum = 3;
                        gun.material[0].color = new THREE.Color(0xB4FAF1);
                        
                        break;
                    }       
                    else{
                        gun.material[0].color  = new THREE.Color(0.5,0.5,0.5);
                        itemNum = 0;
                    }
                }
            }           
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.25);
        document.querySelector("#curtain").style.width = window.innerWidth/1.5 +"px";
        resized = true;
    }

    function changeScene() {
        // Trigger animation
        var div = document.getElementById("curtain");
        var canvas = document.querySelector("canvas");
        div.style.position = "absolute";
        div.style.bottom = "0";
        div.style.left = "0";
        div.style.right = "0";
        
        div.style.zIndex = "1";
        div.style.marginLeft = "auto"; 
        div.style.marginRight = "auto"; 
        var sizes = renderer.getSize();
        div.style.width = sizes.width +"px";
        div.style.height = sizes.height + "px";
        div.style.top = "105px";
            
        
            
        div.classList.remove("screen-change");
        div.offsetWidth;
        div.classList.add("screen-change");
       
        // Trigger scene change
        setTimeout(function() {
            
            if(scene_selector == 0){
                scene_selector+=1;
                UI_menu.style.display = "block";
                allowAnimation = false;
            }
            else if(scene_selector == 1){
                scene_selector += recorded;
            }
            else{
                scene_selector = 1;
            }
            
        }, 1000);
    };
    function determinScene(){
        var out_scene;
        var out_cam;
        var allElem = document.querySelectorAll(".UIelem");
        for(var i = 0; i<allElem.length; i++){
            allElem[i].style.display = "none";
        }
        switch(scene_selector){
            case 0:
                out_scene = scene;
                out_cam = camera;
                
                break;
            case 1:
            
                out_scene = scene_1;
                out_cam = camera_1;
                document.querySelector("#h3_1").style.display = "block";
                document.querySelector("#p3_2").style.display = "block";
                break;
            case 2:
                out_scene = scene_2;
                out_cam = camera_2;
                document.querySelector("#h0_1").style.display = "block";
                document.querySelector("#p0_2").style.display = "block";
                break;
            case 3:
                out_scene = scene_3;
                out_cam = camera_3;
                document.querySelector("#h1_1").style.display = "block";
                document.querySelector("#p1_2").style.display = "block";
                break;
            case 4:
                out_scene = scene_4;
                out_cam = camera_4;
                document.querySelector("#h2_1").style.display = "block";
                document.querySelector("#p2_2").style.display = "block";
                break;
        }
        var array = [out_scene,out_cam];
        return array;
    }

    function determinCam(){
        var out_cam;
        switch(scene_selector){
            case 0:
                out_cam = camera;
                break;
            case 1:
                out_cam = camera_1;
                break;
            case 2:
                out_cam = camera_2;
                break;
            case 3:
                out_cam = camera_3;
                break;
            case 4:
                out_cam = camera_4;
                break;
        }
        return out_cam;
    }

    window.addEventListener('scroll', () => {
        
        if($(document).scrollTop() > 95){
            allowRender = false;
        }
        else{
            allowRender = true;
        }
        //element is almost about to be visible, time to start rendering
        
    });
    function hovering(elem){
        elem.style.filter = "saturate(3)";
    }
    function Nothovering(elem){
        elem.style.filter = "saturate(1)";
    }

var lines = document.querySelectorAll(".box");
var items = document.querySelectorAll(".t_link");
var UI_menu = document.querySelector("#UI");

var exe_1 = function(){
    hovering(lines[1]);
}
var exe_3 = function(){
    Nothovering(lines[1]);
}

var exe_2 = function(){
    hovering(lines[2]);
}
var exe_4 = function(){
    Nothovering(lines[2]);
}

var exe_5 = function(){
    hovering(lines[0]);
}
var exe_6 = function(){
    Nothovering(lines[0]);
}

items[0].addEventListener("mouseover", exe_1);
items[0].addEventListener("mouseout", exe_3);

items[1].addEventListener("mouseout", exe_4);
items[1].addEventListener("mouseover", exe_2);

UI_menu.addEventListener("mouseover", exe_5);
UI_menu.addEventListener("mouseout", exe_6);

UI_menu.addEventListener("click", function(event){
    var div = document.getElementById("curtain");
    var canvas = document.querySelector("canvas");
    div.style.position = "absolute";
    div.style.bottom = "0";
    div.style.left = "0";
    div.style.right = "0";
    
    div.style.zIndex = "1";
    div.style.marginLeft = "auto"; 
    div.style.marginRight = "auto"; 
    var sizes = renderer.getSize();
    div.style.width = sizes.width +"px";
    div.style.height = (sizes.height) + "px";
    div.style.top = "105px";
        
    div.classList.remove("screen-change");
    div.offsetWidth;
    div.classList.add("screen-change");
   
    // Trigger scene change
    setTimeout(function() {
        

        if(scene_selector == 2 || scene_selector == 3 || scene_selector == 4){
            scene_selector = 1;
        }
        else{
            scene_selector = 0;
            UI_menu.style.display = "none";
            camera.position.y = 12;
            camera.position.z = 20;
            mixer.existingAction(clips[0]).reset();
            totalAnimTime = 8.9;
            one_chance = true;
            mixer.update(delta1);
            
        }
        
    }, 1000);
}, false);

window.addEventListener("keydown", keyDown);
document.addEventListener("visibilitychange", handleVisibilityChange, false);
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'resize', onWindowResize, false );
document.querySelector("body").addEventListener("click", function( event ) {
    // display the current click count inside the clicked div
    clicked = true;
    recorded = itemNum;
    currentFrame = lastFrame;
    console.log(clicked);
  }, false);

init();