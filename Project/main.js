let allowAnimation = false;

let keyboard = {};//keyboard input

var move_1, move_2, move_3;//tween stuff

let loader, model, animation, mixer, clock, delta, flyControl;//all sorts



function init(){

    var scene = new  THREE.Scene();
    var gui = new dat.GUI();//add this to help with gui values
    var enableFog = true;
    loader = new THREE.JSONLoader();
    clock = new THREE.Clock();
    
   
    if(enableFog){
        scene.fog = new THREE.FogExp2(0xffffff, 0.01);
    }
    

    var plane = getPlane(100);
    var directionalLight = getDirectionalLight(1);
    var sphere = getSphere(0.05);
    var ambientLight = getAmbientLight(1);

    plane.name = 'plane-1';
    plane.rotation.x = Math.PI/2;

    directionalLight.position.x = 13;
    directionalLight.position.y = 10;
    directionalLight.position.z = 10;
    directionalLight.intensity = 2;

    scene.add(plane);
    directionalLight.add(sphere);
    scene.add(directionalLight);
    scene.add(ambientLight);
    loader.load("../models/JSON/Chest/Chest.json", addModelAnim);
    //loader.load("../models/JSON/Chest/Inn.json", addModel);
    
    var camera = new THREE.PerspectiveCamera(
        75,//angle
        1600/900,//aspect
        1,
        1000
    );

    


    

    scene.add(camera);
    camera.position.y = 12;
    camera.position.z = 20;

    flyControl = new THREE.FlyControls(camera,document.querySelector("#webgl"));
    flyControl.keydown = null;


   // camRotation = new THREE.TrackballControls( camera );
   // console.log(camRotation);


   // cameraYPosition.position.y = 1;
   // cameraZPosition.position.z = 30;
  //  cameraXRotation.rotation.x = -Math.PI/6;


    move_1 = new TWEEN.Tween({val: 100})
        .to({val: -50}, 12000)
        .onUpdate(function(){
           // cameraZPosition.position.z = this.val;
        })


    move_2 = new TWEEN.Tween({val: -Math.PI/2})
        .to({val: 0}, 6000)
        .delay(1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function() {
           // cameraXRotation.rotation.x = this.val;
        })

    move_3 = new TWEEN.Tween({val: 0})
        .to({val: Math.PI/2}, 6000)
        .delay(1000)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function() {
           // cameraYRotation.rotation.y = this.val;
        })
        


    var renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.setSize(1600, 900);

    renderer.setClearColor('rgb(120, 120, 120)');

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
    function getPointLight(intensity){
        var light = new THREE.PointLight(0xffffff, intensity);
        light.castShadow = true;
        return light;

    }
    function getAmbientLight(intensity){
        var light = new THREE.AmbientLight('rgb(10,30,50)', intensity);
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
        renderer.render(
            scene,
            camera
        );    
        delta = clock.getDelta();
        
        
        if(mixer != undefined && keyboard[69]){
            mixer.update(delta);
        }
        

        controls.update(delta*10);

        
        if(keyboard[87]){
            allowAnimation = !allowAnimation;
            move_1.start();
            move_2.start();
            move_3.start();
            keyboard[87] = false;
        }
            

        if(allowAnimation)
            TWEEN.update();

        requestAnimationFrame(function(){
            update(renderer, scene, camera, controls);
        });

        

    }


    function keyDown(e){
        keyboard[e.keyCode] = true;
    }

    function addModelAnim(geometry, materials){
        for(var i = 0; i< materials.length; i++){
            materials[i].morphTargets = true;
        }
        materials.skinning = true;
        model = new THREE.Mesh(geometry, materials);
        model.receiveShadow = true;
        model.castShadow = true;
        mixer = new THREE.AnimationMixer(model); 
        var clips = model.geometry.animations;     
        var action = mixer.clipAction( clips[0] );
        action.play();
        scene.add(model);      
    }
    function addModel(geometry, materials){
        model = new THREE.Mesh(geometry, materials);
        model.receiveShadow = true;
        model.castShadow = true;
        scene.add(model);         
    }



window.addEventListener("keydown", keyDown);
//window.addEventListener("mousemove", onmousemove, false);




var scene = init();