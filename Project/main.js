let allowAnimation = false;
let allowRender = true;
var one_time_use = true;
let keyboard = {};//keyboard input

var move_0,move_0_1, move_1, move_2, move_3;//tween stuff

let loader, model, animation, mixer, clock, flyControl;//all sorts of stuff

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var camera, scene, renderer;
var mesh, defaultColor, mainInn;
var uvSet;
var particleSYS,options, spawnerOptions;
var tick = 0;
var lightMap;
var lastFrame, currentFrame = 0;
var clicked, highlighted = false;
var totalAnimTime = 8.9;
var one_chance = true;
var mouseY;
function init(){

    scene = new  THREE.Scene();
    var gui = new dat.GUI();//add this to help with gui values
    var enableFog = true;
    loader = new THREE.JSONLoader();
    clock = new THREE.Clock();
    
    
    
   
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
    //pointLight_3.add(sphere2);
    scene.add(pointLight_3);


    var pointLight_4 = getPointLight(3,0xf2e0d0,0,0.5);//BIGGEST CANDLE,OW YEAH
    pointLight_4.position = reposition(pointLight_4.position,-39.5,6,-35.5);  
    scene.add(pointLight_4);

    var pointLight_5 = getPointLight(1, 0xf2e0d0,0,1);
    pointLight_5.position = reposition(pointLight_5.position,-27,10,-27);
    scene.add(pointLight_5);


    loader.load("../models/JSON/Inn/Inn.json", addModel);
    loader.load("../models/JSON/Chest/Chest.json", addModelAnim);
    
    
    camera = new THREE.PerspectiveCamera(
        60,//angle
        1280/650,//aspect
        1,
        1000
    );

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


    gui.add( options, "velocityRandomness", 0, 3 );
    gui.add( options, "positionRandomness", 0, 3 );
    gui.add( options, "size", 1, 20 );
    gui.add( options, "sizeRandomness", 0, 25 );
    gui.add( options, "colorRandomness", 0, 1 );
    gui.add( options, "lifetime", .1, 10 );
    gui.add( options, "turbulence", 0, 1 );
    gui.add( spawnerOptions, "spawnRate", 10, 30000 );
    gui.add( spawnerOptions, "timeScale", -1, 1 );

    scene.add(camera);
    camera.position.y = 12;
    camera.position.z = 20;
    
    flyControl = new THREE.FlyControls(camera, document.querySelector("#webgl"));
    var initial = new THREE.Vector3( 0, 1, 0 );
    camera.lookAt(initial);
    
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
    renderer.setSize(1280, 650);

    renderer.setClearColor('rgb(0, 0, 0)');

    document.getElementById('webgl').appendChild(renderer.domElement);
    

    update(renderer, scene, camera, flyControl);

    return scene;
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

    function update(renderer, scene, camera, controls){
        
        var delta1 = clock.getDelta() * spawnerOptions.timeScale;
        
        lastFrame = tick;
        
        if(mouseY < 730)
            controls.update(delta1*10);
        
        tick += delta1;
        if ( tick < 0 ) tick = 0;
        if ( delta1 > 0 ) {
            options.position.x = (Math.sin( tick * spawnerOptions.horizontalSpeed ) * 7)+.75;
            options.position.y = (Math.sin( tick * spawnerOptions.verticalSpeed ) * 1.5)+6;
            options.position.z = (Math.sin( tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed ) * 8) -2;
            for ( var x = 0; x < spawnerOptions.spawnRate * delta1; x++ ) {
                // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                particleSYS.spawnParticle( options );
            }
        }
        particleSYS.update( tick );
        
        if(allowRender){
        
        renderer.render(
            scene,
            camera
        );    
        
        
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
            console.log("started_moving");
        }
        if(lastFrame>currentFrame){
            clicked = false;
        }
        




        if(allowAnimation){
            TWEEN.update();
            totalAnimTime -= 0.075;
            if(totalAnimTime < -3 && one_chance){
                changeScene();
                one_chance = false;
            }
            console.log(totalAnimTime);
        }
            
    }

        requestAnimationFrame(function(){
            update(renderer, scene, camera, controls);
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
        console.log(model);
        console.log(model.position);
        mixer = new THREE.AnimationMixer(model); 
        var clips = model.geometry.animations;     
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
        mouse.x = ( event.clientX / 1600 ) * 2 - 1;
        mouse.y = - ( event.clientY / 900 ) * 2 + 1;     
    
        raycaster.setFromCamera( mouse, camera );   
        if(mesh == undefined)
            return;
          
        var intersects = raycaster.intersectObject(mesh);
        
        
        if(intersects.length > 0){
            
            mesh.material[0].color = new THREE.Color(0xB4FAF1);
            highlighted = true;
        }


        
        else{
            mesh.material[0].color  = new THREE.Color(0.5,0.5,0.5);
            highlighted = false;
        }
        
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function changeScene() {
        // Trigger animation
        var div = document.getElementById("curtain");
        div.style.margin = "auto";
        div.style.position = "absolute";
        
        div.style.top = "50px";
        div.style.left = "215px";
        div.style.width = "1280px";
        div.style.height = "650px";
        div.classList.remove("screen-change");
        div.offsetWidth;
        div.classList.add("screen-change");
       
        // Trigger scene change
        setTimeout(function() {
            // Your real code should go here. I've added something
            // just to demonstrate the change
            var color = color == "#0000FF"? "#FF0000" : "#0000FF";
            
        }, 1000);
    };



window.addEventListener("keydown", keyDown);
document.addEventListener("visibilitychange", handleVisibilityChange, false);
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'resize', onWindowResize, false );
document.querySelector("body").addEventListener("click", function( event ) {
    // display the current click count inside the clicked div
    clicked = true;
    currentFrame = lastFrame;
    console.log(clicked);
  }, false);

var scene = init();